<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                version="1.0" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes" xml:space="preserve"/>
  <xsl:param name="domain-name"/>
  <xsl:variable name="productsTableName">EcomProducts</xsl:variable>
  <xsl:variable name="categoriesTableName">EcomProductCategory</xsl:variable>
  <xsl:variable name="categoryTranslationsTableName">EcomProductCategoryTranslation</xsl:variable>
  <xsl:variable name="categoryFieldsTableName">EcomProductCategoryField</xsl:variable>
  <xsl:variable name="categoryFieldTranslationsTableName">EcomProductCategoryFieldTranslation</xsl:variable>
  <xsl:variable name="categoryFieldValuesTableName">EcomProductCategoryFieldValue</xsl:variable>
  <xsl:variable name="categorySystemNamePrefix">IceCat</xsl:variable>
  <xsl:variable name="categoryTranslationNamePrefix">IceCat - </xsl:variable>

  <xsl:key name="product-feature-by-id" match="ProductFeature/Feature" use="@ID"/>
  <xsl:key name="product-feature-by-id-and-language" match="ProductFeature/Feature" use="concat(@ID, '-', Name/@langid)"/>
  <xsl:key name="product-category-by-id" match="CategoryFeatureGroup/FeatureGroup" use="@ID"/>
  <xsl:key name="product-category-feature-group-by-category-id" match="CategoryFeatureGroup/FeatureGroup" use="../@ID"/>
  <xsl:key name="product-category-translation-by-id" match="CategoryFeatureGroup/FeatureGroup/Name" use="concat(../@ID, '-', @langid )"/>
  <xsl:key name="product-categoryfield-by-id" match="ProductFeature" use="@ID"/>
  <xsl:key name="product-features-by-categoryid" match="ProductFeature/Feature" use="../@CategoryFeatureGroup_ID"/>

  <xsl:template match="/root">
    <tables>
      <xsl:call-template name="ProductTable" />
      <xsl:call-template name="CategoryTable"/>
      <xsl:call-template name="CategoryTranslationTable" />
      <xsl:call-template name="CategoryFieldTable" />
      <xsl:call-template name="CategoryFieldTranslationTable" />
      <xsl:call-template name="CategoryFieldValueTable" />
    </tables>
  </xsl:template>

  <xsl:template name="ProductTable">
    <table tableName="{$productsTableName}">
      <xsl:apply-templates select="Product[@Code > -1]" mode="ProductTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="Product" mode="ProductTableRow">
    <item table="{$productsTableName}">
      <column columnName="ProductId">
        <xsl:value-of select="@DwProductId"/>
      </column>
      <column columnName="ProductLanguageId">
        <xsl:value-of select="@DwProductLanguageId"/>
      </column>
      <column columnName="ProductVariantId">
        <xsl:value-of select="@DwProductVariantId"/>
      </column>
      <column columnName="ProductNumber">
        <xsl:value-of select="@Prod_id"/>
      </column>
      <column columnName="ProductEan">
        <xsl:value-of select="EANCode/@EAN"/>
      </column>
      <column columnName="ProductName">
        <xsl:value-of select="@Title"/>
      </column>
      <column columnName="ProductShortDescription">
        <xsl:value-of select="SummaryDescription/ShortSummaryDescription"/>
      </column>
      <column columnName="ProductLongDescription">
        <xsl:value-of select="SummaryDescription/LongSummaryDescription"/>
      </column>
      <column columnName="DataFetched">
        <xsl:value-of select="@DataFetched"/>
      </column>
      <column columnName="ProductFoundInIceCat">
        <xsl:value-of select="count(*) > 0"/>
      </column>
      <column columnName="ProductUpdated">
        <xsl:value-of select="@DataFetched"/>
      </column>      
    </item>
  </xsl:template>

  <xsl:template name="CategoryTable">
    <table tableName="{$categoriesTableName}">
      <xsl:apply-templates select="Product/CategoryFeatureGroup/FeatureGroup" mode="CategoryTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="CategoryFeatureGroup/FeatureGroup" mode="CategoryTableRow">
    <xsl:variable name="cat" select="key('product-category-by-id', @ID)" />
    <xsl:if test="generate-id() = generate-id($cat) and count(key('product-features-by-categoryid', $cat/../@ID)) > 0">
      <item table="{$categoriesTableName}">
        <column columnName="CategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, @ID)"/>
        </column>
        <column columnName="CategoryType">1</column>
        <column columnName="CategoryProductProperties">True</column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template name="CategoryTranslationTable">
    <table tableName="{$categoryTranslationsTableName}">
      <xsl:apply-templates select="Product/CategoryFeatureGroup/FeatureGroup/Name"
                           mode="CategoryTranslationTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="CategoryFeatureGroup/FeatureGroup/Name" mode="CategoryTranslationTableRow">
    <xsl:variable name="catTranslation" select="key('product-category-translation-by-id', concat(../@ID, '-', @langid))" />
    <xsl:if test="generate-id() = generate-id($catTranslation) and count(key('product-features-by-categoryid', $catTranslation/../../@ID)) > 0">
      <item table="{$categoryTranslationsTableName}">
        <column columnName="CategoryTranslationCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, ../@ID)"/>
        </column>
        <column columnName="CategoryTranslationLanguageId">
          <xsl:value-of select="../../../@DwProductLanguageId"/>
        </column>
        <column columnName="CategoryTranslationCategoryName">
          <xsl:value-of select="concat($categoryTranslationNamePrefix, @Value)"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template name="CategoryFieldTable">
    <table tableName="{$categoryFieldsTableName}">
      <xsl:apply-templates select="Product/ProductFeature/Feature" mode="CategoryFieldTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="ProductFeature/Feature" mode="CategoryFieldTableRow">
    <xsl:variable name="feature" select="key('product-feature-by-id', @ID)[1]" />
    <xsl:if test="generate-id() = generate-id($feature)">
      <xsl:variable name="catGroup" select="key('product-category-feature-group-by-category-id', $feature/../@CategoryFeatureGroup_ID)"/>
      <xsl:if test="count($catGroup) > 0">
        <item table="{$categoryFieldsTableName}">
          <column columnName="FieldId">
            <xsl:value-of select="@ID"/>
          </column>
          <column columnName="FieldCategoryId">
            <xsl:value-of select="concat($categorySystemNamePrefix, $catGroup/@ID)"/>
          </column>
          <column columnName="FieldTemplateTag">
            <xsl:value-of select="@ID"/>
          </column>
          <column columnName="FieldType">1</column>
          <column columnName="FieldHideEmpty">1</column>
          <column columnName="FieldPresentationType">1</column>
          <column columnName="FieldSortOrder">
            <xsl:value-of select="position()-1"/>
          </column>
        </item>
      </xsl:if>
    </xsl:if>
  </xsl:template>

  <xsl:template name="CategoryFieldTranslationTable">
    <table tableName="{$categoryFieldTranslationsTableName}">
      <xsl:apply-templates select="Product/ProductFeature/Feature" mode="CategoryFieldTranslationTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="ProductFeature/Feature" mode="CategoryFieldTranslationTableRow">
    <xsl:if test="generate-id() = generate-id(key('product-feature-by-id-and-language', concat(@ID, '-', Name/@langid)))">
      <xsl:variable name="catGroup" select="key('product-category-feature-group-by-category-id', ../@CategoryFeatureGroup_ID)"/>
      <xsl:if test="count($catGroup) > 0">
        <item table="{$categoryFieldTranslationsTableName}">
          <column columnName="FieldTranslationFieldId">
            <xsl:value-of select="@ID"/>
          </column>
          <column columnName="FieldTranslationFieldCategoryId">
            <xsl:value-of select="concat($categorySystemNamePrefix, $catGroup/@ID)"/>
          </column>
          <column columnName="FieldTranslationLanguageId">
            <xsl:value-of select="../../@DwProductLanguageId"/>
          </column>
          <column columnName="FieldTranslationFieldLabel">
            <xsl:value-of select="Name/@Value"/>
          </column>
        </item>
      </xsl:if>
    </xsl:if>
  </xsl:template>

  <xsl:template name="CategoryFieldValueTable">
    <table tableName="{$categoryFieldValuesTableName}">
      <xsl:apply-templates select="Product/ProductFeature" mode="CategoryFieldValueTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="ProductFeature" mode="CategoryFieldValueTableRow">
    <xsl:variable name="catGroup" select="key('product-category-feature-group-by-category-id', @CategoryFeatureGroup_ID)"/>
    <xsl:if test="count($catGroup) > 0">
      <item table="{$categoryFieldValuesTableName}">
        <column columnName="FieldValueFieldId">
          <xsl:value-of select="Feature/@ID"/>
        </column>
        <column columnName="FieldValueFieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $catGroup/@ID)"/>
        </column>
        <column columnName="FieldValueProductId">
          <xsl:value-of select="../@DwProductId"/>
        </column>
        <column columnName="FieldValueProductVariantId">
          <xsl:value-of select="../@DwProductVariantId"/>
        </column>
        <column columnName="FieldValueProductLanguageId">
          <xsl:value-of select="../@DwProductLanguageId"/>
        </column>
        <column columnName="FieldValueValue">
          <xsl:value-of select="@Presentation_Value"/>
        </column>
        <column columnName="FieldValueSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
