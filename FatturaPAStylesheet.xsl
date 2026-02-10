<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!--
    FatturaPA (Ordinary) viewer — (Alexandre Silva)
    Version: 1.2 (download buttons + browser XSLT 1.0)
    Date: 2026-02-10

    Notes:
    - Pure XSLT 1.0 (works in Firefox/Chromium XSLT engines)
    - Uses local-name() to be resilient to default namespaces
    - Aligns to FatturaPA 1.2.3 structure (Header, Body, Allegati)
  -->

  <xsl:output method="html" version="5" encoding="UTF-8" indent="yes"/>
  <xsl:strip-space elements="*"/>

  <!-- Code mappings (partial, extendable) -->
  <xsl:template name="map-code">
    <xsl:param name="type"/>
    <xsl:param name="code"/>
    <xsl:choose>
      <xsl:when test="$type='TD'">
        <xsl:choose>
          <xsl:when test="$code='TD01'">TD01 — Fattura</xsl:when>
          <xsl:when test="$code='TD02'">TD02 — Acconto/Anticipo su fattura</xsl:when>
          <xsl:when test="$code='TD03'">TD03 — Acconto/Anticipo su parcella</xsl:when>
          <xsl:when test="$code='TD04'">TD04 — Nota di credito</xsl:when>
          <xsl:when test="$code='TD05'">TD05 — Nota di debito</xsl:when>
          <xsl:when test="$code='TD06'">TD06 — Parcella</xsl:when>
          <xsl:when test="$code='TD16'">TD16 — Integrazione reverse charge</xsl:when>
          <xsl:when test="$code='TD17'">TD17 — Integrazione servizi UE</xsl:when>
          <xsl:when test="$code='TD18'">TD18 — Integrazione acquisto beni UE</xsl:when>
          <xsl:when test="$code='TD19'">TD19 — Integrazione acquisti extra UE</xsl:when>
          <xsl:when test="$code='TD20'">TD20 — Autofattura per regolarizzazione</xsl:when>
          <xsl:when test="$code='TD21'">TD21 — Autofattura per splafonamento</xsl:when>
          <xsl:when test="$code='TD24'">TD24 — Fattura differita</xsl:when>
          <xsl:when test="$code='TD25'">TD25 — Fattura semplificata</xsl:when>
          <xsl:when test="$code='TD26'">TD26 — Cessione di beni ammortizzabili</xsl:when>
          <xsl:when test="$code='TD27'">TD27 — Autofattura per autoconsumo</xsl:when>
          <xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$type='Natura'">
        <xsl:choose>
          <xsl:when test="$code='N1'">N1 — Escluse ex art. 15</xsl:when>
          <xsl:when test="$code='N2' or starts-with($code,'N2')">N2 — Non soggette</xsl:when>
          <xsl:when test="$code='N3' or starts-with($code,'N3')">N3 — Non imponibili</xsl:when>
          <xsl:when test="$code='N4'">N4 — Esenti</xsl:when>
          <xsl:when test="$code='N5'">N5 — Regime del margine</xsl:when>
          <xsl:when test="$code='N6' or starts-with($code,'N6')">N6 — Inversione contabile</xsl:when>
          <xsl:when test="$code='N7'">N7 — IVA assolta in altro stato UE</xsl:when>
          <xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$type='Esig'">
        <xsl:choose>
          <xsl:when test="$code='I'">I — IVA immediata</xsl:when>
          <xsl:when test="$code='D'">D — IVA differita</xsl:when>
          <xsl:when test="$code='S'">S — Scissione dei pagamenti</xsl:when>
          <xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$type='MP'">
        <xsl:choose>
          <xsl:when test="$code='MP01'">Contanti</xsl:when>
          <xsl:when test="$code='MP05'">Bonifico</xsl:when>
          <xsl:when test="$code='MP08'">Carta di credito</xsl:when>
          <xsl:when test="$code='MP12'">SEPA SDD</xsl:when>
          <xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Label:Value row -->
  <xsl:template name="row">
    <xsl:param name="label"/><xsl:param name="value"/>
    <xsl:if test="normalize-space($value)!=''">
      <div class="kv-row"><div class="kv-label"><xsl:value-of select="$label"/></div><div class="kv-value"><xsl:value-of select="$value"/></div></div>
    </xsl:if>
  </xsl:template>

  <!-- Root -->
  <xsl:template match="/">
    <html lang="it">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Fattura Elettronica</title>
        <style>
          /* Palette from user's snippet */
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #e3e3e3; color: #212223; margin: 0; padding: 0 0 40px 0; }
          header { background: linear-gradient(90deg, #d64000 60%, #123015 100%); color: #ffffff; padding: 24px 32px 16px 32px; border-bottom: 4px solid #e9b045; }
          h1 { margin-top: 0; font-size: 2.2em; letter-spacing: 1px; }
          h2 { color: #d64000; border-left: 6px solid #123015; padding-left: 10px; margin-top: 2em; }
          h3 { color: #123015; margin-top: 1.5em; }
          main { padding: 24px 32px; }
          table { border-collapse: collapse; width: 100%; background: #ffffff; margin-bottom: 2em; box-shadow: 0 2px 8px #0001; }
          th { background: #123015; color: #ffffff; padding: 10px 8px; font-weight: 600; border: 1px solid #123015; }
          td { border: 1px solid #e3e3e3; padding: 8px; }
          tr:nth-child(even) { background: #f7f7f7; }
          ul { background: #ffffff; border: 1.5px solid #d64000; border-radius: 6px; padding: 16px 24px; color: #404040; margin-bottom: 2em; }
          pre { background: #e3e3e3; border-left: 4px solid #d64000; padding: 12px; overflow-x: auto; font-size: 1em; margin-bottom: 1.5em; }
          .status-success { color: #123015; font-weight: bold; }
          .status-failed { color: #d64000; font-weight: bold; }
          .btn { display:inline-block; background:#d64000; color:#ffffff !important; padding: .35rem .65rem; border-radius:6px; border:1px solid #a33000; text-decoration:none; font-weight:600; }
          /* Invoice-specific layout */
          .meta { opacity:.9; font-size:.95em; }
          .card { background:#ffffff; border-left:6px solid #d64000; padding:14px 16px; margin:16px 0; box-shadow: 0 2px 8px #0001; }
          .kv { display:block; }
          .kv-row { display:grid; grid-template-columns: 220px 1fr; gap:8px; align-items:start; margin:.25rem 0; }
          .kv-label { font-weight:600; color:#123015; }
          .kv-value { color:#212223; }
          .grid { display:grid; grid-template-columns: 1fr 1fr; gap:16px; }
          @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } .kv-row{ grid-template-columns: 160px 1fr; } }
        </style>
      </head>
      <body>
        <header>
          <h1>Fattura Elettronica</h1>
          <div class="meta">
            <xsl:text>Versione: </xsl:text>
            <xsl:value-of select="/*[local-name()='FatturaElettronica']/@versione | /*[local-name()='FatturaElettronica']/@Versione"/>
            <xsl:text> · Formato: </xsl:text>
            <xsl:value-of select="/*[local-name()='FatturaElettronica']/*[local-name()='FatturaElettronicaHeader']/*[local-name()='DatiTrasmissione']/*[local-name()='FormatoTrasmissione']"/>
          </div>
        </header>
        <main>
          <xsl:apply-templates select="/*[local-name()='FatturaElettronica']"/>
        </main>
      </body>
    </html>
  </xsl:template>

  <!-- FatturaElettronica: header cards + bodies -->
  <xsl:template match="*[local-name()='FatturaElettronica']">
    <div class="grid">
      <div class="card kv">
        <h2>Cedente/Prestatore</h2>
        <xsl:apply-templates select="*[local-name()='FatturaElettronicaHeader']/*[local-name()='CedentePrestatore']" mode="kv"/>
      </div>
      <div class="card kv">
        <h2>Cessionario/Committente</h2>
        <xsl:apply-templates select="*[local-name()='FatturaElettronicaHeader']/*[local-name()='CessionarioCommittente']" mode="kv"/>
      </div>
      <div class="card kv">
        <h2>Dati Trasmissione</h2>
        <xsl:apply-templates select="*[local-name()='FatturaElettronicaHeader']/*[local-name()='DatiTrasmissione']" mode="kv"/>
      </div>
      <div class="card kv">
        <h2>Terzo Intermediario / Soggetto Emittente</h2>
        <xsl:apply-templates select="*[local-name()='FatturaElettronicaHeader']/*[local-name()='TerzoIntermediarioOSoggettoEmittente']" mode="kv"/>
      </div>
    </div>

    <xsl:apply-templates select="*[local-name()='FatturaElettronicaBody']"/>
  </xsl:template>

  <!-- Header sections in KV mode -->
  <xsl:template match="*[local-name()='DatiTrasmissione']" mode="kv">
    <xsl:call-template name="row"><xsl:with-param name="label" select="'IdTrasmittente'"/><xsl:with-param name="value" select="concat(*[local-name()='IdTrasmittente']/*[local-name()='IdPaese'],' ',*[local-name()='IdTrasmittente']/*[local-name()='IdCodice'])"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Progressivo Invio'"/><xsl:with-param name="value" select="*[local-name()='ProgressivoInvio']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Formato Trasmissione'"/><xsl:with-param name="value" select="*[local-name()='FormatoTrasmissione']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Codice Destinatario / PEC'"/><xsl:with-param name="value" select="concat(*[local-name()='CodiceDestinatario'],' ',*[local-name()='PECDestinatario'])"/></xsl:call-template>
  </xsl:template>

  <xsl:template match="*[local-name()='CedentePrestatore']" mode="kv">
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Denominazione'"/><xsl:with-param name="value" select="*[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Denominazione'] | *[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Nome']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'CF/IVA'"/><xsl:with-param name="value" select="concat(*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdPaese'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdCodice'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='CodiceFiscale'])"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Regime Fiscale'"/><xsl:with-param name="value" select="*[local-name()='DatiAnagrafici']/*[local-name()='RegimeFiscale']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Sede'"/><xsl:with-param name="value" select="concat(*[local-name()='Sede']/*[local-name()='Indirizzo'],' ',*[local-name()='Sede']/*[local-name()='NumeroCivico'],', ',*[local-name()='Sede']/*[local-name()='CAP'],' ',*[local-name()='Sede']/*[local-name()='Comune'],' (',*[local-name()='Sede']/*[local-name()='Provincia'],') ',*[local-name()='Sede']/*[local-name()='Nazione'])"/></xsl:call-template>
  </xsl:template>

  <xsl:template match="*[local-name()='CessionarioCommittente']" mode="kv">
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Denominazione'"/><xsl:with-param name="value" select="*[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Denominazione'] | *[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Nome']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'CF/IVA'"/><xsl:with-param name="value" select="concat(*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdPaese'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdCodice'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='CodiceFiscale'])"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Sede'"/><xsl:with-param name="value" select="concat(*[local-name()='Sede']/*[local-name()='Indirizzo'],' ',*[local-name()='Sede']/*[local-name()='NumeroCivico'],', ',*[local-name()='Sede']/*[local-name()='CAP'],' ',*[local-name()='Sede']/*[local-name()='Comune'],' (',*[local-name()='Sede']/*[local-name()='Provincia'],') ',*[local-name()='Sede']/*[local-name()='Nazione'])"/></xsl:call-template>
  </xsl:template>

  <xsl:template match="*[local-name()='TerzoIntermediarioOSoggettoEmittente']" mode="kv">
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Denominazione'"/><xsl:with-param name="value" select="*[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Denominazione'] | *[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Nome']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'CF/IVA'"/><xsl:with-param name="value" select="concat(*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdPaese'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdCodice'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='CodiceFiscale'])"/></xsl:call-template>
  </xsl:template>

  <!-- Body -->
  <xsl:template match="*[local-name()='FatturaElettronicaBody']">
    <div class="card kv">
      <h2>Dati Generali Documento</h2>
      <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiGeneraliDocumento']" mode="kv"/>
    </div>

    <!-- Riferimenti vari -->
    <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiOrdineAcquisto']"/>
    <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiContratto']"/>
    <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiConvenzione']"/>
    <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiRicezione']"/>
    <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiFattureCollegate']"/>
    <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiTrasporto']"/>
    <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='FatturaPrincipale']"/>

    <div class="card">
      <h2>Dettaglio Linee</h2>
      <xsl:call-template name="render-beni-servizi"/>
    </div>

    <div class="card">
      <h2>Riepilogo IVA</h2>
      <xsl:call-template name="render-riepilogo-iva"/>
    </div>

    <div class="card">
      <h2>Pagamento</h2>
      <xsl:call-template name="render-pagamento"/>
    </div>

    <div class="card">
      <h2>Allegati</h2>
      <xsl:call-template name="render-allegati"/>
    </div>
  </xsl:template>

  <!-- DatiGeneraliDocumento KV fields -->
  <xsl:template match="*[local-name()='DatiGeneraliDocumento']" mode="kv">
    <xsl:variable name="td" select="*[local-name()='TipoDocumento']"/>
    <xsl:variable name="tdLabel"><xsl:call-template name="map-code"><xsl:with-param name="type" select="'TD'"/><xsl:with-param name="code" select="$td"/></xsl:call-template></xsl:variable>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Tipo Documento'"/><xsl:with-param name="value" select="$tdLabel"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Numero'"/><xsl:with-param name="value" select="*[local-name()='Numero']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Data'"/><xsl:with-param name="value" select="*[local-name()='Data']"/></xsl:call-template>
    <xsl:if test="*[local-name()='Divisa']"><xsl:call-template name="row"><xsl:with-param name="label" select="'Divisa'"/><xsl:with-param name="value" select="*[local-name()='Divisa']"/></xsl:call-template></xsl:if>
    <xsl:for-each select="*[local-name()='Causale']"><div class="kv-row"><div class="kv-label">Causale</div><div class="kv-value"><xsl:value-of select="."/></div></div></xsl:for-each>
    <xsl:if test="*[local-name()='ImportoTotaleDocumento']"><xsl:call-template name="row"><xsl:with-param name="label" select="'Totale Documento'"/><xsl:with-param name="value" select="*[local-name()='ImportoTotaleDocumento']"/></xsl:call-template></xsl:if>
    <xsl:if test="*[local-name()='Arrotondamento']"><xsl:call-template name="row"><xsl:with-param name="label" select="'Arrotondamento'"/><xsl:with-param name="value" select="*[local-name()='Arrotondamento']"/></xsl:call-template></xsl:if>
    <xsl:if test="*[local-name()='Art73']"><xsl:call-template name="row"><xsl:with-param name="label" select="'Art. 73'"/><xsl:with-param name="value" select="*[local-name()='Art73']"/></xsl:call-template></xsl:if>
  </xsl:template>

  <!-- Riferimenti cards -->
  <xsl:template match="*[local-name()='DatiOrdineAcquisto' or local-name()='DatiContratto' or local-name()='DatiConvenzione' or local-name()='DatiRicezione' or local-name()='DatiFattureCollegate']">
    <div class="card kv">
      <h2><xsl:value-of select="local-name()"/></h2>
      <xsl:for-each select="*[local-name()='RiferimentoNumeroLinea']"><div class="kv-row"><div class="kv-label">Rif. Linea</div><div class="kv-value"><xsl:value-of select="."/></div></div></xsl:for-each>
      <xsl:call-template name="row"><xsl:with-param name="label" select="'IdDocumento'"/><xsl:with-param name="value" select="*[local-name()='IdDocumento']"/></xsl:call-template>
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Data'"/><xsl:with-param name="value" select="*[local-name()='Data']"/></xsl:call-template>
      <xsl:for-each select="*[local-name()='CodiceCUP' or local-name()='CodiceCIG' or local-name()='NumItem' or local-name()='CodiceCommessaConvenzione']">
        <div class="kv-row"><div class="kv-label"><xsl:value-of select="local-name()"/></div><div class="kv-value"><xsl:value-of select="."/></div></div>
      </xsl:for-each>
    </div>
  </xsl:template>

  <!-- DatiTrasporto -->
  <xsl:template match="*[local-name()='DatiTrasporto']">
    <div class="card kv">
      <h2>Dati Trasporto</h2>
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Mezzo Trasporto'"/><xsl:with-param name="value" select="*[local-name()='MezzoTrasporto']"/></xsl:call-template>
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Causale Trasporto'"/><xsl:with-param name="value" select="*[local-name()='CausaleTrasporto']"/></xsl:call-template>
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Data/Ora Ritiro/Consegna'"/><xsl:with-param name="value" select="concat(*[local-name()='DataOraRitiro'],' ',*[local-name()='DataOraConsegna'])"/></xsl:call-template>
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Indirizzo Resa'"/><xsl:with-param name="value" select="*[local-name()='IndirizzoResa']/*[local-name()='Indirizzo']"/></xsl:call-template>
    </div>
  </xsl:template>

  <!-- FatturaPrincipale -->
  <xsl:template match="*[local-name()='FatturaPrincipale']">
    <div class="card kv">
      <h2>Fattura Principale</h2>
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Numero'"/><xsl:with-param name="value" select="*[local-name()='NumeroFatturaPrincipale']"/></xsl:call-template>
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Data'"/><xsl:with-param name="value" select="*[local-name()='DataFatturaPrincipale']"/></xsl:call-template>
    </div>
  </xsl:template>

  <!-- Beni/Servizi table -->
  <xsl:template name="render-beni-servizi">
    <xsl:variable name="bs" select="*[local-name()='DatiBeniServizi']"/>
    <table>
      <thead>
        <tr>
          <th>#</th><th>Descrizione</th><th>Quantità</th><th>UM</th><th>Prezzo</th><th>Sconto/Magg.</th><th>Aliquota</th><th>Natura</th><th>Prezzo Tot.</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="$bs/*[local-name()='DettaglioLinee']">
          <tr>
            <td><xsl:value-of select="*[local-name()='NumeroLinea']"/></td>
            <td>
              <div><xsl:value-of select="*[local-name()='Descrizione']"/></div>
              <xsl:if test="*[local-name()='CodiceArticolo']">
                <div>
                  <xsl:for-each select="*[local-name()='CodiceArticolo']">
                    <span><xsl:value-of select="concat(*[local-name()='CodiceTipo'],': ',*[local-name()='CodiceValore'],' ')"/></span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </td>
            <td><xsl:value-of select="*[local-name()='Quantita']"/></td>
            <td><xsl:value-of select="*[local-name()='UnitaMisura']"/></td>
            <td><xsl:value-of select="*[local-name()='PrezzoUnitario']"/></td>
            <td>
              <xsl:for-each select="*[local-name()='ScontoMaggiorazione']">
                <div><xsl:value-of select="concat(*[local-name()='Tipo'],' ',*[local-name()='Percentuale'],'% ',*[local-name()='Importo'])"/></div>
              </xsl:for-each>
            </td>
            <td><xsl:value-of select="*[local-name()='AliquotaIVA']"/>%</td>
            <td>
              <xsl:variable name="nat" select="*[local-name()='Natura']"/>
              <xsl:call-template name="map-code"><xsl:with-param name="type" select="'Natura'"/><xsl:with-param name="code" select="$nat"/></xsl:call-template>
            </td>
            <td><xsl:value-of select="*[local-name()='PrezzoTotale']"/></td>
          </tr>
          <xsl:if test="*[local-name()='AltriDatiGestionali']">
            <tr>
              <td></td>
              <td colspan="8">
                <ul>
                  <xsl:for-each select="*[local-name()='AltriDatiGestionali']">
                    <li>
                      <strong><xsl:value-of select="*[local-name()='TipoDato']"/></strong>:
                      <xsl:value-of select="*[local-name()='RiferimentoTesto'] | *[local-name()='RiferimentoNumero'] | *[local-name()='RiferimentoData']"/>
                    </li>
                  </xsl:for-each>
                </ul>
              </td>
            </tr>
          </xsl:if>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

  <!-- Riepilogo IVA table -->
  <xsl:template name="render-riepilogo-iva">
    <table>
      <thead>
        <tr>
          <th>Aliquota</th><th>Natura</th><th>Imponibile</th><th>Imposta</th><th>Esigibilità</th><th>Rif. Normativo</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="*[local-name()='DatiBeniServizi']/*[local-name()='DatiRiepilogo']">
          <tr>
            <td><xsl:value-of select="*[local-name()='AliquotaIVA']"/>%</td>
            <td><xsl:variable name="nat" select="*[local-name()='Natura']"/><xsl:call-template name="map-code"><xsl:with-param name="type" select="'Natura'"/><xsl:with-param name="code" select="$nat"/></xsl:call-template></td>
            <td><xsl:value-of select="*[local-name()='ImponibileImporto']"/></td>
            <td><xsl:value-of select="*[local-name()='Imposta']"/></td>
            <td><xsl:variable name="es" select="*[local-name()='EsigibilitaIVA']"/><xsl:call-template name="map-code"><xsl:with-param name="type" select="'Esig'"/><xsl:with-param name="code" select="$es"/></xsl:call-template></td>
            <td><xsl:value-of select="*[local-name()='RiferimentoNormativo']"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

  <!-- Pagamento card with details -->
  <xsl:template name="render-pagamento">
    <xsl:if test="*[local-name()='DatiPagamento']">
      <xsl:for-each select="*[local-name()='DatiPagamento']/*[local-name()='DettaglioPagamento']">
        <div class="kv">
          <xsl:call-template name="row"><xsl:with-param name="label" select="'Condizioni'"/><xsl:with-param name="value" select="../*[local-name()='CondizioniPagamento']"/></xsl:call-template>
          <xsl:variable name="mp" select="*[local-name()='ModalitaPagamento']"/>
          <xsl:variable name="mpLabel"><xsl:call-template name="map-code"><xsl:with-param name="type" select="'MP'"/><xsl:with-param name="code" select="$mp"/></xsl:call-template></xsl:variable>
          <xsl:call-template name="row"><xsl:with-param name="label" select="'Modalità'"/><xsl:with-param name="value" select="$mpLabel"/></xsl:call-template>
          <xsl:call-template name="row"><xsl:with-param name="label" select="'Data Scadenza'"/><xsl:with-param name="value" select="*[local-name()='DataScadenzaPagamento']"/></xsl:call-template>
          <xsl:call-template name="row"><xsl:with-param name="label" select="'Importo'"/><xsl:with-param name="value" select="*[local-name()='ImportoPagamento']"/></xsl:call-template>
          <xsl:call-template name="row"><xsl:with-param name="label" select="'IBAN'"/><xsl:with-param name="value" select="*[local-name()='IBAN']"/></xsl:call-template>
          <xsl:call-template name="row"><xsl:with-param name="label" select="'Banca'"/><xsl:with-param name="value" select="concat(*[local-name()='IstitutoFinanziario'],' ',*[local-name()='BIC'])"/></xsl:call-template>
        </div>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

  <!-- Allegati with download buttons -->
  <xsl:template name="render-allegati">
    <xsl:if test="*[local-name()='Allegati']">
      <table>
        <thead><tr><th>Nome</th><th>Descrizione</th><th>Formato</th><th>Scarica</th></tr></thead>
        <tbody>
          <xsl:for-each select="*[local-name()='Allegati']">
            <tr>
              <td><xsl:value-of select="*[local-name()='NomeAttachment']"/></td>
              <td><xsl:value-of select="*[local-name()='DescrizioneAttachment']"/></td>
              <td><xsl:value-of select="*[local-name()='FormatoAttachment']"/></td>
              <td>
                <xsl:choose>
                  <xsl:when test="normalize-space(*[local-name()='Attachment'])!=''">
                    <a class="btn">
                      <xsl:attribute name="href">
                        <xsl:text>data:</xsl:text>
                        <xsl:choose>
                          <xsl:when test="normalize-space(*[local-name()='FormatoAttachment'])!=''"><xsl:value-of select="normalize-space(*[local-name()='FormatoAttachment'])"/></xsl:when>
                          <xsl:otherwise>application/octet-stream</xsl:otherwise>
                        </xsl:choose>
                        <xsl:text>;base64,</xsl:text>
                        <xsl:value-of select="normalize-space(*[local-name()='Attachment'])"/>
                      </xsl:attribute>
                      <xsl:attribute name="download"><xsl:value-of select="*[local-name()='NomeAttachment']"/></xsl:attribute>
                      Scarica allegato
                    </a>
                  </xsl:when>
                  <xsl:otherwise><span class="status-failed">(nessun contenuto)</span></xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
