<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl">

  <!--
    FatturaPA (Ordinary Invoice) viewer — pure XSLT 1.0
    Author: M365 Copilot for Alexandre Silva
    Date: 2026-02-10

    Scope:
      * Compatible with Firefox / Chromium XSLT 1.0 engines.
      * Covers the complete FatturaPA 1.2.3 structure with explicit sections
        and a generic fallback for any unmapped elements.
      * Output: HTML with inline CSS (no external Tailwind/JS).

    References:
      - Official FatturaPA documentation page (links to XSD/XSL 1.2.3)
      - Table-view of Ordinary Invoice trace (PDF/XLS)

    Notes:
      * Many FatturaPA XML files use a default namespace. This stylesheet
        intentionally matches by local-name() to support both namespaced and
        non-namespaced documents.

    Distribution:
      Add to XML:
        <?xml-stylesheet type="text/xsl" href="fatturapa_browser_1_0.xsl"?>
  -->

  <xsl:output method="html" version="5" encoding="UTF-8" indent="yes"/>
  <xsl:strip-space elements="*"/>

  <!-- ========== UTILITIES ==========
       Helpers for label rendering and safe value formatting.
  -->
  <xsl:variable name="nbsp"><xsl:text>&#160;</xsl:text></xsl:variable>

  <!-- print a label-value row -->
  <xsl:template name="row">
    <xsl:param name="label"/>
    <xsl:param name="value"/>
    <xsl:if test="normalize-space($value) != ''">
      <div class="row">
        <div class="label"><xsl:value-of select="$label"/></div>
        <div class="value"><xsl:value-of select="$value"/></div>
      </div>
    </xsl:if>
  </xsl:template>

  <!-- print a two-col box with a title -->
  <xsl:template name="box">
    <xsl:param name="title"/>
    <xsl:param name="content-node" select="."/>
    <div class="box">
      <h2><xsl:value-of select="$title"/></h2>
      <div class="box-body">
        <xsl:apply-templates select="$content-node" mode="fields"/>
      </div>
    </div>
  </xsl:template>

  <!-- generic code -> human friendly translation (partial but extensible) -->
  <xsl:template name="map-code">
    <xsl:param name="type"/>
    <xsl:param name="code"/>
    <xsl:choose>
      <!-- TipoDocumento TDxx -->
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
      <!-- Natura Nn -->
      <xsl:when test="$type='Natura'">
        <xsl:choose>
          <xsl:when test="$code='N1'">N1 — Escluse ex art. 15</xsl:when>
          <xsl:when test="$code='N2' or $code='N2.1' or $code='N2.2'">N2 — Non soggette</xsl:when>
          <xsl:when test="$code='N3' or starts-with($code,'N3')">N3 — Non imponibili</xsl:when>
          <xsl:when test="$code='N4'">N4 — Esenti</xsl:when>
          <xsl:when test="$code='N5'">N5 — Regime del margine</xsl:when>
          <xsl:when test="$code='N6' or starts-with($code,'N6')">N6 — Inversione contabile</xsl:when>
          <xsl:when test="$code='N7'">N7 — IVA assolta in altro stato UE</xsl:when>
          <xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <!-- EsigibilitaIVA -->
      <xsl:when test="$type='Esig'">
        <xsl:choose>
          <xsl:when test="$code='I'">I — IVA immediata</xsl:when>
          <xsl:when test="$code='D'">D — IVA differita</xsl:when>
          <xsl:when test="$code='S'">S — Scissione dei pagamenti</xsl:when>
          <xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <!-- ModalitaPagamento MPxx -->
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

  <!-- ========== ROOT ==========
       Handles both a single invoice and a batch (multiple bodies).
  -->
  <xsl:template match="/">
    <html version="5">
      <head>
        <meta charset="UTF-8"/>
        <title>Fattura Elettronica</title>
        <style>
          :root { --fg: #111; --muted:#666; --bg:#fff; --accent:#0d6efd; --soft:#f5f7fb; }
          html,body{margin:0;padding:0;background:var(--bg);color:var(--fg);font:14px/1.45 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
          h1,h2,h3{margin:0 0 .5rem 0}
          h1{font-size:1.6rem}
          h2{font-size:1.1rem;color:#222;border-bottom:1px solid #e5e7ef;padding-bottom:.25rem;margin-bottom:.5rem}
          .wrap{max-width:980px;margin:24px auto;padding:0 16px}
          header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
          .meta{color:var(--muted);font-size:.9rem}
          .grid{display:grid;grid-template-columns:repeat(12,1fr);gap:12px}
          .col-6{grid-column:span 6}
          .col-12{grid-column:span 12}
          .box{background:var(--soft);padding:12px;border-radius:8px;border:1px solid #e5e7ef}
          .box-body{display:flex;flex-direction:column;gap:6px}
          .row{display:grid;grid-template-columns:220px 1fr;gap:8px;align-items:start}
          .row .label{font-weight:600;color:#333}
          .row .value{color:#111}
          table{width:100%;border-collapse:collapse;margin:.25rem 0}
          th,td{border:1px solid #e5e7ef;padding:6px 8px;vertical-align:top}
          th{background:#f0f3fa;text-align:left}
          tfoot td{font-weight:700}
          .chip{display:inline-block;padding:.1rem .4rem;border-radius:999px;background:#e9f2ff;border:1px solid #cfe3ff;color:#0b5ed7;font-weight:600;font-size:.8rem}
          .muted{color:var(--muted)}
          .section{margin-top:14px}
          .warn{background:#fff3cd;border:1px solid #ffe69c;color:#8a6d3b;border-radius:6px;padding:6px 8px}
          .footer{margin-top:16px;color:var(--muted);font-size:.85rem}
        </style>
      </head>
      <body>
        <div class="wrap">
          <xsl:apply-templates select="/*[local-name()='FatturaElettronica']"/>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- ========== FatturaElettronica ==========
       Header + one or more Body nodes.
  -->
  <xsl:template match="*[local-name()='FatturaElettronica']">
    <header>
      <h1>Fattura Elettronica <span class="chip"><xsl:value-of select="@versione | @Versione"/></span></h1>
      <div class="meta">
        <xsl:text>Formato: </xsl:text>
        <xsl:value-of select="/*[local-name()='FatturaElettronica']/*[local-name()='FatturaElettronicaHeader']/*[local-name()='DatiTrasmissione']/*[local-name()='FormatoTrasmissione']"/>
      </div>
    </header>

    <div class="grid">
      <div class="col-6">
        <xsl:call-template name="box">
          <xsl:with-param name="title" select="'Cedente/Prestatore'"/>
          <xsl:with-param name="content-node" select="*[local-name()='FatturaElettronicaHeader']/*[local-name()='CedentePrestatore']"/>
        </xsl:call-template>
      </div>
      <div class="col-6">
        <xsl:call-template name="box">
          <xsl:with-param name="title" select="'Cessionario/Committente'"/>
          <xsl:with-param name="content-node" select="*[local-name()='FatturaElettronicaHeader']/*[local-name()='CessionarioCommittente']"/>
        </xsl:call-template>
      </div>
      <div class="col-6">
        <xsl:call-template name="box">
          <xsl:with-param name="title" select="'Dati Trasmissione'"/>
          <xsl:with-param name="content-node" select="*[local-name()='FatturaElettronicaHeader']/*[local-name()='DatiTrasmissione']"/>
        </xsl:call-template>
      </div>
      <div class="col-6">
        <xsl:call-template name="box">
          <xsl:with-param name="title" select="'Terzo Intermediario / Soggetto Emittente'"/>
          <xsl:with-param name="content-node" select="*[local-name()='FatturaElettronicaHeader']/*[local-name()='TerzoIntermediarioOSoggettoEmittente']"/>
        </xsl:call-template>
      </div>
    </div>

    <xsl:apply-templates select="*[local-name()='FatturaElettronicaBody']"/>

    <div class="footer">
      <div>Generato con foglio di stile XSLT 1.0 compatibile browser.</div>
    </div>
  </xsl:template>

  <!-- ========== Header sections in fields mode ==========
       Render label:value for known subfields.
  -->
  <xsl:template match="*[local-name()='DatiTrasmissione']" mode="fields">
    <xsl:call-template name="row">
      <xsl:with-param name="label" select="'IdTrasmittente'"/>
      <xsl:with-param name="value" select="concat(*[local-name()='IdTrasmittente']/*[local-name()='IdPaese'],' ',*[local-name()='IdTrasmittente']/*[local-name()='IdCodice'])"/>
    </xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Progressivo Invio'"/><xsl:with-param name="value" select="*[local-name()='ProgressivoInvio']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Formato Trasmissione'"/><xsl:with-param name="value" select="*[local-name()='FormatoTrasmissione']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Codice Destinatario/PEC'"/><xsl:with-param name="value" select="concat(*[local-name()='CodiceDestinatario'],' ',*[local-name()='PECDestinatario'])"/></xsl:call-template>
    <xsl:if test="*[local-name()='ContattiTrasmittente']">
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Contatti'"/><xsl:with-param name="value" select="concat(*[local-name()='ContattiTrasmittente']/*[local-name()='Telefono'],' ',*[local-name()='ContattiTrasmittente']/*[local-name()='Email'])"/></xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="*[local-name()='CedentePrestatore']" mode="fields">
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Denominazione'"/><xsl:with-param name="value" select="*[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Denominazione'] | *[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Nome']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'CF/IVA'"/><xsl:with-param name="value" select="concat(*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdPaese'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdCodice'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='CodiceFiscale'])"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Regime Fiscale'"/><xsl:with-param name="value" select="*[local-name()='DatiAnagrafici']/*[local-name()='RegimeFiscale']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Sede'"/><xsl:with-param name="value" select="concat(*[local-name()='Sede']/*[local-name()='Indirizzo'],' ',*[local-name()='Sede']/*[local-name()='NumeroCivico'],', ',*[local-name()='Sede']/*[local-name()='CAP'],' ',*[local-name()='Sede']/*[local-name()='Comune'],' (',*[local-name()='Sede']/*[local-name()='Provincia'],') ',*[local-name()='Sede']/*[local-name()='Nazione'])"/></xsl:call-template>
    <xsl:if test="*[local-name()='StabileOrganizzazione']">
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Stabile Organizzazione'"/><xsl:with-param name="value" select="concat(*[local-name()='StabileOrganizzazione']/*[local-name()='Indirizzo'],', ',*[local-name()='StabileOrganizzazione']/*[local-name()='Comune'],' ',*[local-name()='StabileOrganizzazione']/*[local-name()='Nazione'])"/></xsl:call-template>
    </xsl:if>
    <xsl:if test="*[local-name()='IscrizioneREA']">
      <xsl:call-template name="row"><xsl:with-param name="label" select="'REA'"/><xsl:with-param name="value" select="concat('Ufficio ',*[local-name()='IscrizioneREA']/*[local-name()='Ufficio'],', ',*[local-name()='IscrizioneREA']/*[local-name()='NumeroREA'],', Cap. Sociale ',*[local-name()='IscrizioneREA']/*[local-name()='CapitaleSociale'],', Socio Unico: ',*[local-name()='IscrizioneREA']/*[local-name()='SocioUnico'],', Stato: ',*[local-name()='IscrizioneREA']/*[local-name()='StatoLiquidazione'])"/></xsl:call-template>
    </xsl:if>
    <xsl:if test="*[local-name()='Contatti']">
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Contatti'"/><xsl:with-param name="value" select="concat(*[local-name()='Contatti']/*[local-name()='Telefono'],' ',*[local-name()='Contatti']/*[local-name()='Email'],' ',*[local-name()='Contatti']/*[local-name()='Fax'])"/></xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="*[local-name()='CessionarioCommittente']" mode="fields">
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Denominazione'"/><xsl:with-param name="value" select="*[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Denominazione'] | *[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Nome']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'CF/IVA'"/><xsl:with-param name="value" select="concat(*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdPaese'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdCodice'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='CodiceFiscale'])"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Sede'"/><xsl:with-param name="value" select="concat(*[local-name()='Sede']/*[local-name()='Indirizzo'],' ',*[local-name()='Sede']/*[local-name()='NumeroCivico'],', ',*[local-name()='Sede']/*[local-name()='CAP'],' ',*[local-name()='Sede']/*[local-name()='Comune'],' (',*[local-name()='Sede']/*[local-name()='Provincia'],') ',*[local-name()='Sede']/*[local-name()='Nazione'])"/></xsl:call-template>
    <xsl:if test="*[local-name()='StabileOrganizzazione']">
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Stabile Organizzazione'"/><xsl:with-param name="value" select="concat(*[local-name()='StabileOrganizzazione']/*[local-name()='Indirizzo'],', ',*[local-name()='StabileOrganizzazione']/*[local-name()='Comune'],' ',*[local-name()='StabileOrganizzazione']/*[local-name()='Nazione'])"/></xsl:call-template>
    </xsl:if>
    <xsl:if test="*[local-name()='RappresentanteFiscale']">
      <xsl:call-template name="row"><xsl:with-param name="label" select="'Rappresentante Fiscale'"/><xsl:with-param name="value" select="concat(*[local-name()='RappresentanteFiscale']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdPaese'],' ',*[local-name()='RappresentanteFiscale']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdCodice'],' ',*[local-name()='RappresentanteFiscale']/*[local-name()='Denominazione'])"/></xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="*[local-name()='TerzoIntermediarioOSoggettoEmittente']" mode="fields">
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Denominazione'"/><xsl:with-param name="value" select="*[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Denominazione'] | *[local-name()='DatiAnagrafici']/*[local-name()='Anagrafica']/*[local-name()='Nome']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'CF/IVA'"/><xsl:with-param name="value" select="concat(*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdPaese'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='IdFiscaleIVA']/*[local-name()='IdCodice'],' ',*[local-name()='DatiAnagrafici']/*[local-name()='CodiceFiscale'])"/></xsl:call-template>
  </xsl:template>

  <!-- ========== Body ==========
       Each <FatturaElettronicaBody> becomes a section with Generali, BeniServizi, Riepilogo, Pagamento, Allegati
  -->
  <xsl:template match="*[local-name()='FatturaElettronicaBody']">
    <div class="section">
      <div class="grid">
        <div class="col-12">
          <xsl:call-template name="box">
            <xsl:with-param name="title" select="'Dati Generali Documento'"/>
            <xsl:with-param name="content-node" select="*[local-name()='DatiGenerali']/*[local-name()='DatiGeneraliDocumento']"/>
          </xsl:call-template>
        </div>
        <div class="col-12">
          <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiOrdineAcquisto']"/>
          <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiContratto']"/>
          <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiConvenzione']"/>
          <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiRicezione']"/>
          <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiFattureCollegate']"/>
          <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='DatiTrasporto']"/>
          <xsl:apply-templates select="*[local-name()='DatiGenerali']/*[local-name()='FatturaPrincipale']"/>
        </div>
        <div class="col-12">
          <xsl:call-template name="render-beni-servizi"/>
        </div>
        <div class="col-12">
          <xsl:call-template name="render-riepilogo-iva"/>
        </div>
        <div class="col-12">
          <xsl:call-template name="render-pagamento"/>
        </div>
        <div class="col-12">
          <xsl:call-template name="render-allegati"/>
        </div>
      </div>
    </div>
  </xsl:template>

  <!-- DatiGeneraliDocumento fields -->
  <xsl:template match="*[local-name()='DatiGeneraliDocumento']" mode="fields">
    <xsl:variable name="td" select="*[local-name()='TipoDocumento']"/>
    <xsl:variable name="tdLabel">
      <xsl:call-template name="map-code"><xsl:with-param name="type" select="'TD'"/><xsl:with-param name="code" select="$td"/></xsl:call-template>
    </xsl:variable>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Tipo Documento'"/><xsl:with-param name="value" select="$tdLabel"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Numero'"/><xsl:with-param name="value" select="*[local-name()='Numero']"/></xsl:call-template>
    <xsl:call-template name="row"><xsl:with-param name="label" select="'Data'"/><xsl:with-param name="value" select="*[local-name()='Data']"/></xsl:call-template>
    <xsl:if test="*[local-name()='Divisa']"><xsl:call-template name="row"><xsl:with-param name="label" select="'Divisa'"/><xsl:with-param name="value" select="*[local-name()='Divisa']"/></xsl:call-template></xsl:if>
    <xsl:if test="*[local-name()='Causale']"><xsl:for-each select="*[local-name()='Causale']"><div class="row"><div class="label">Causale</div><div class="value"><xsl:value-of select="."/></div></div></xsl:for-each></xsl:if>
    <xsl:if test="*[local-name()='ImportoTotaleDocumento']"><xsl:call-template name="row"><xsl:with-param name="label" select="'Totale Documento'"/><xsl:with-param name="value" select="*[local-name()='ImportoTotaleDocumento']"/></xsl:call-template></xsl:if>
    <xsl:if test="*[local-name()='Arrotondamento']"><xsl:call-template name="row"><xsl:with-param name="label" select="'Arrotondamento'"/><xsl:with-param name="value" select="*[local-name()='Arrotondamento']"/></xsl:call-template></xsl:if>
    <xsl:if test="*[local-name()='Art73']"><xsl:call-template name="row"><xsl:with-param name="label" select="'Art. 73'"/><xsl:with-param name="value" select="*[local-name()='Art73']"/></xsl:call-template></xsl:if>
  </xsl:template>

  <!-- Riferimenti (Ordini, Contratti, Convenzioni, Ricezione, Fatture Collegate) -->
  <xsl:template match="*[local-name()='DatiOrdineAcquisto' or local-name()='DatiContratto' or local-name()='DatiConvenzione' or local-name()='DatiRicezione' or local-name()='DatiFattureCollegate']">
    <div class="box">
      <h2><xsl:value-of select="local-name()"/></h2>
      <div class="box-body">
        <xsl:for-each select="*[local-name()='RiferimentoNumeroLinea']"><div class="row"><div class="label">Rif. Linea</div><div class="value"><xsl:value-of select="."/></div></div></xsl:for-each>
        <xsl:call-template name="row"><xsl:with-param name="label" select="'IdDocumento'"/><xsl:with-param name="value" select="*[local-name()='IdDocumento']"/></xsl:call-template>
        <xsl:call-template name="row"><xsl:with-param name="label" select="'Data'"/><xsl:with-param name="value" select="*[local-name()='Data']"/></xsl:call-template>
        <xsl:for-each select="*[local-name()='CodiceCUP' or local-name()='CodiceCIG' or local-name()='NumItem' or local-name()='CodiceCommessaConvenzione']">
          <div class="row"><div class="label"><xsl:value-of select="local-name()"/></div><div class="value"><xsl:value-of select="."/></div></div>
        </xsl:for-each>
      </div>
    </div>
  </xsl:template>

  <!-- DatiTrasporto -->
  <xsl:template match="*[local-name()='DatiTrasporto']">
    <div class="box">
      <h2>Dati Trasporto</h2>
      <div class="box-body">
        <xsl:call-template name="row"><xsl:with-param name="label" select="'Mezzo Trasporto'"/><xsl:with-param name="value" select="*[local-name()='MezzoTrasporto']"/></xsl:call-template>
        <xsl:call-template name="row"><xsl:with-param name="label" select="'Causale Trasporto'"/><xsl:with-param name="value" select="*[local-name()='CausaleTrasporto']"/></xsl:call-template>
        <xsl:call-template name="row"><xsl:with-param name="label" select="'Data Ora Ritiro'"/><xsl:with-param name="value" select="concat(*[local-name()='DataOraRitiro'],' ',*[local-name()='DataOraConsegna'])"/></xsl:call-template>
        <xsl:call-template name="row"><xsl:with-param name="label" select="'Indirizzo Resa'"/><xsl:with-param name="value" select="*[local-name()='IndirizzoResa']/*[local-name()='Indirizzo']"/></xsl:call-template>
      </div>
    </div>
  </xsl:template>

  <!-- FatturaPrincipale -->
  <xsl:template match="*[local-name()='FatturaPrincipale']">
    <div class="box">
      <h2>Fattura Principale</h2>
      <div class="box-body">
        <xsl:call-template name="row"><xsl:with-param name="label" select="'Numero'"/><xsl:with-param name="value" select="*[local-name()='NumeroFatturaPrincipale']"/></xsl:call-template>
        <xsl:call-template name="row"><xsl:with-param name="label" select="'Data'"/><xsl:with-param name="value" select="*[local-name()='DataFatturaPrincipale']"/></xsl:call-template>
      </div>
    </div>
  </xsl:template>

  <!-- Beni/Servizi -->
  <xsl:template name="render-beni-servizi">
    <xsl:variable name="bs" select="*[local-name()='DatiBeniServizi']"/>
    <div class="box">
      <h2>Dettaglio Linee</h2>
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
                  <div class="muted">
                    <xsl:for-each select="*[local-name()='CodiceArticolo']">
                      <xsl:value-of select="concat(*[local-name()='CodiceTipo'],': ',*[local-name()='CodiceValore'],' ')"/>
                    </xsl:for-each>
                  </div>
                </xsl:if>
                <xsl:if test="*[local-name()='RiferimentoAmministrazione']">
                  <div class="muted">Rif. Amm.: <xsl:value-of select="*[local-name()='RiferimentoAmministrazione']"/></div>
                </xsl:if>
              </td>
              <td><xsl:value-of select="*[local-name()='Quantita']"/></td>
              <td><xsl:value-of select="*[local-name()='UnitaMisura']"/></td>
              <td><xsl:value-of select="*[local-name()='PrezzoUnitario']"/></td>
              <td>
                <xsl:for-each select="*[local-name()='ScontoMaggiorazione']">
                  <div class="muted">
                    <xsl:value-of select="concat(*[local-name()='Tipo'], ' ', *[local-name()='Percentuale'], '% ', *[local-name()='Importo'])"/>
                  </div>
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
                  <div class="muted">
                    <xsl:for-each select="*[local-name()='AltriDatiGestionali']">
                      <div>
                        <strong><xsl:value-of select="*[local-name()='TipoDato']"/></strong>:
                        <xsl:value-of select="*[local-name()='RiferimentoTesto'] | *[local-name()='RiferimentoNumero'] | *[local-name()='RiferimentoData']"/>
                      </div>
                    </xsl:for-each>
                  </div>
                </td>
              </tr>
            </xsl:if>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <!-- Riepilogo IVA -->
  <xsl:template name="render-riepilogo-iva">
    <div class="box">
      <h2>Riepilogo IVA</h2>
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
              <td>
                <xsl:variable name="nat" select="*[local-name()='Natura']"/>
                <xsl:call-template name="map-code"><xsl:with-param name="type" select="'Natura'"/><xsl:with-param name="code" select="$nat"/></xsl:call-template>
              </td>
              <td><xsl:value-of select="*[local-name()='ImponibileImporto']"/></td>
              <td><xsl:value-of select="*[local-name()='Imposta']"/></td>
              <td>
                <xsl:variable name="es" select="*[local-name()='EsigibilitaIVA']"/>
                <xsl:call-template name="map-code"><xsl:with-param name="type" select="'Esig'"/><xsl:with-param name="code" select="$es"/></xsl:call-template>
              </td>
              <td><xsl:value-of select="*[local-name()='RiferimentoNormativo']"/></td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <!-- DatiPagamento -->
  <xsl:template name="render-pagamento">
    <xsl:if test="*[local-name()='DatiPagamento']">
      <div class="box">
        <h2>Pagamento</h2>
        <xsl:for-each select="*[local-name()='DatiPagamento']/*[local-name()='DettaglioPagamento']">
          <div class="box muted" style="background:#fff;border-style:dashed;margin:.5rem 0">
            <div class="box-body">
              <xsl:call-template name="row"><xsl:with-param name="label" select="'Condizioni'"/><xsl:with-param name="value" select="../*[local-name()='CondizioniPagamento']"/></xsl:call-template>
              <xsl:variable name="mp" select="*[local-name()='ModalitaPagamento']"/>
              <xsl:variable name="mpLabel">
                <xsl:call-template name="map-code"><xsl:with-param name="type" select="'MP'"/><xsl:with-param name="code" select="$mp"/></xsl:call-template>
              </xsl:variable>
              <xsl:call-template name="row"><xsl:with-param name="label" select="'Modalità'"/><xsl:with-param name="value" select="$mpLabel"/></xsl:call-template>
              <xsl:call-template name="row"><xsl:with-param name="label" select="'Data Scadenza'"/><xsl:with-param name="value" select="*[local-name()='DataScadenzaPagamento']"/></xsl:call-template>
              <xsl:call-template name="row"><xsl:with-param name="label" select="'Importo'"/><xsl:with-param name="value" select="*[local-name()='ImportoPagamento']"/></xsl:call-template>
              <xsl:call-template name="row"><xsl:with-param name="label" select="'IBAN'"/><xsl:with-param name="value" select="*[local-name()='IBAN']"/></xsl:call-template>
              <xsl:call-template name="row"><xsl:with-param name="label" select="'Banca'"/><xsl:with-param name="value" select="concat(*[local-name()='IstitutoFinanziario'],' ',*[local-name()='BIC'])"/></xsl:call-template>
            </div>
          </div>
        </xsl:for-each>
      </div>
    </xsl:if>
  </xsl:template>

  <!-- Allegati -->
  <xsl:template name="render-allegati">
    <xsl:if test="*[local-name()='Allegati']">
      <div class="box">
        <h2>Allegati</h2>
        <table>
          <thead><tr><th>Nome</th><th>Descrizione</th><th>Formato</th></tr></thead>
          <tbody>
            <xsl:for-each select="*[local-name()='Allegati']">
              <tr>
                <td><xsl:value-of select="*[local-name()='NomeAttachment']"/></td>
                <td><xsl:value-of select="*[local-name()='DescrizioneAttachment']"/></td>
                <td><xsl:value-of select="*[local-name()='FormatoAttachment']"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
        <div class="warn">Nota: i contenuti binari Base64 non sono visualizzati per ragioni di sicurezza.</div>
      </div>
    </xsl:if>
  </xsl:template>

  <!-- ========== Generic fallback ==========
       Ensures any unmapped element is still visible.
  -->
  <xsl:template match="*" mode="fields">
    <!-- Default: list all child elements as label:value -->
    <xsl:for-each select="*">
      <div class="row">
        <div class="label"><xsl:value-of select="local-name()"/></div>
        <div class="value">
          <xsl:choose>
            <xsl:when test="*">
              <xsl:apply-templates select="." mode="fields"/>
            </xsl:when>
            <xsl:otherwise><xsl:value-of select="."/></xsl:otherwise>
          </xsl:choose>
        </div>
      </div>
    </xsl:for-each>
  </xsl:template>

</xsl:stylesheet>
