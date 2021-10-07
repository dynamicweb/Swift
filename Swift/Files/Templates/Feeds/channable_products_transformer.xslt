<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                version="1.0" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes" xml:space="preserve"/>
  <xsl:param name="domain-name"/>
  <xsl:param name="product-catalog-page-id"/>

  <xsl:template match="/Root">
    <xsl:element name="Products">
      <xsl:apply-templates select="Products"/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="Products">
    <!-- Fields information https://support.channable.com/hc/en-us/articles/360007359434-Which-fields-do-I-need-in-my-own-import-file- -->
    <xsl:element name="Product">
      <!--Mandatory field-->
      <xsl:call-template name="availability"/>
      <!--Mandatory field-->
      <xsl:call-template name="description"/>
      <!--Mandatory field-->
      <xsl:copy-of select="Id"/>
      <!--Mandatory field-->
      <xsl:element name="UniqueId">
        <xsl:value-of select="concat(Id, '_', VariantId, '_', LanguageId)"/>
      </xsl:element>
      <!--Mandatory field-->
      <xsl:call-template name="image_link"/>
      <!--Mandatory field-->
      <xsl:call-template name="link"/>
      <!--Mandatory field-->
      <xsl:call-template name="price"/>
      <!--Mandatory field-->
      <xsl:call-template name="sale_price"/>
      <!--Mandatory field-->
      <xsl:call-template name="size"/>
      <!--Mandatory field-->
      <xsl:call-template name="title"/>
      <!--Recommended field-->
      <xsl:call-template name="CurrencyCode"/>
      <xsl:call-template name="stock"/>
      <xsl:call-template name="additional_image_link"/>
      <xsl:call-template name="Ean"/>
      <xsl:call-template name="Sku"/>
      <xsl:call-template name="Shipping_Weight"/>
      <!--Recommended field-->
      <xsl:apply-templates select="ProductFields" />
      <xsl:apply-templates select="ProductCategories" />
      <xsl:apply-templates select="GroupPaths" />
      <xsl:call-template name="VariantsAttributes"/>

      <!--All dynamicweb fields - exclude list of fields -->
      <xsl:copy-of select="*[not(self::VariantInfo|self::Discount|self::AssetCategories|self::GroupPaths|self::Groups|self::Price|self::Id|self::VariantId|self::LanguageId|self::EAN|self::Number|self::StockLevel|self::Name|self::Link|self::LongDescription|self::ShortDescription|self::Images|self::ImagePatternImages|self::DefaultImage|self::ProductFields|self::ProductCategories|self::PriceBeforeDiscount|self::Manufacturer|self::Height|self::Width|self::Depth|self::Weight|self::VariantCombinations)]"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="availability">
    <!--      In stock / out of stock-->
    <xsl:element name="availability">
      <xsl:choose>
        <xsl:when test="number(StockLevel) > 0">In stock</xsl:when>
        <xsl:otherwise>Out of stock</xsl:otherwise>
      </xsl:choose>
    </xsl:element>
  </xsl:template>

  <xsl:template name="description">
    <xsl:element name="description">
      <xsl:if test="normalize-space(ShortDescription) !=''">
        &lt;h3&gt;<xsl:value-of select="ShortDescription"/>&lt;/h3&gt;
      </xsl:if>
      <xsl:value-of select="LongDescription"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="link">
    <xsl:element name="link">
      <xsl:value-of select="concat($domain-name,'/default.aspx?ID=',$product-catalog-page-id,'&amp;ProductId=', Id)"/>
    </xsl:element>
  </xsl:template>

  <!-- Price area -->
  <xsl:template name="CurrencyCode">
    <xsl:element name="currency">
      <xsl:value-of select="Price/CurrencyCode"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="price">
    <xsl:element name="price">
      <xsl:value-of select='format-number(PriceBeforeDiscount/Price, "###,###.##" )'/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="sale_price">
    <!--    Discounted price-->
    <xsl:element name="sale_price">
      <xsl:value-of select='format-number(Price/Price, "###,###.##" )'/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="size">
    <size>
      <xsl:choose>
        <xsl:when test="normalize-space(Height) !='0'">
          <xsl:value-of select="concat('(HxWxD) ', Height, 'x', Width, 'x', Depth)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="Weight"/>
        </xsl:otherwise>
      </xsl:choose>
    </size>
  </xsl:template>

  <xsl:template name="title">
    <title>
      <xsl:value-of select="Name"/>
    </title>
  </xsl:template>

  <xsl:template name="stock">
    <!--    Amount in stock, e.g. 12-->
    <stock>
      <xsl:choose>
        <xsl:when test="number(StockLevel) > 0">
          <xsl:value-of select="StockLevel"/>
        </xsl:when>
        <xsl:otherwise>0</xsl:otherwise>
      </xsl:choose>
    </stock>
  </xsl:template>

  <xsl:template name="Ean">
    <ean>
      <xsl:choose>
        <xsl:when test="normalize-space(EAN) !=''">
          <xsl:value-of select="normalize-space(EAN)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="Number"/>
        </xsl:otherwise>
      </xsl:choose>
    </ean>
  </xsl:template>

  <xsl:template name="Sku">
    <Sku>
      <xsl:value-of select="Number"/>
    </Sku>
  </xsl:template>

  <xsl:template name="Shipping_Weight">
    <shipping_weight>
      <xsl:value-of select="Weight"/>
    </shipping_weight>
  </xsl:template>

  <!-- Image handling -->
  <xsl:template name="image_link">
    <xsl:if test="normalize-space(DefaultImage/Value/text()) !=''">
      <xsl:element name="image_link">
        <xsl:value-of select="normalize-space(DefaultImage/Value/text())"/>
      </xsl:element>
    </xsl:if>
  </xsl:template>

  <xsl:template name="additional_image_link">
    <xsl:element name="additional_image_link">
      <xsl:apply-templates select="Images | AssetCategories/Assets | ImagePatternImages" mode="additional_image_link"/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="Images | AssetCategories/Assets | ImagePatternImages" mode="additional_image_link">
    <xsl:if test="position() != last()">
      <xsl:value-of select="normalize-space(Value)"/>
      <xsl:text>,</xsl:text>
    </xsl:if>
    <xsl:if test="position() = last()">
          <xsl:value-of select="normalize-space(Value)"/>
    </xsl:if>
  </xsl:template>

  <!-- Additional Product fields -->
  <xsl:template match="node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="ProductFields">
    <xsl:apply-templates select="node()" mode="custom-field" />
  </xsl:template>

  <xsl:template match="ProductFields/*" mode="custom-field">
    <xsl:element name="{local-name()}">
      <xsl:copy-of select="Value/Value/text()|Value/text()" />
    </xsl:element>
  </xsl:template>

  <xsl:template match="ProductCategories">
    <xsl:apply-templates select="node()" mode="category-field-category" />
  </xsl:template>

  <xsl:template match="ProductCategories/*" mode="category-field-category">
    <xsl:apply-templates select="Fields/*" mode="category-field">
      <xsl:with-param name="categoryName" select="local-name()" />
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="Fields/*" mode="category-field">
    <xsl:param name="categoryName" />
    <xsl:element name="{$categoryName}-{local-name()}">
      <xsl:copy-of select="Value/*|Value/text()" />
    </xsl:element>
  </xsl:template>

  <xsl:template match="GroupPaths">
    <CategoryPath>
      <xsl:apply-templates select="GroupPaths" mode="path-item" />
    </CategoryPath>
  </xsl:template>

  <xsl:template match="GroupPaths" mode="path-item">
    <xsl:value-of select="Name"/>
    <xsl:if test="position() != last()">
      <xsl:text>/</xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template name="VariantsAttributes">
    <xsl:variable name="variantId" select="VariantId/text()" />
    <xsl:if test="string-length($variantId) > 0">
      <xsl:variable name="variantInfo" select="descendant::VariantInfo[VariantID = $variantId]" />
      <xsl:if test="count($variantInfo) > 0">
        <xsl:for-each select="$variantInfo//ancestor-or-self::VariantInfo[string-length(VariantID) > 0]">
          <xsl:element name="VariantLevel{position()}">
            <xsl:value-of select="OptionName"/>
          </xsl:element>
        </xsl:for-each>
      </xsl:if>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>