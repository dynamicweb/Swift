<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" version="1.0">
  <xsl:output method="xml" indent="yes" xml:space="preserve" />
  <xsl:param name="domain-name"/>
  <xsl:variable name="productsTableName">EcomProducts</xsl:variable>
  <xsl:variable name="categoriesTableName">EcomProductCategory</xsl:variable>
  <xsl:variable name="categoryTranslationsTableName">EcomProductCategoryTranslation</xsl:variable>
  <xsl:variable name="categoryFieldsTableName">EcomProductCategoryField</xsl:variable>
  <xsl:variable name="categoryFieldTranslationsTableName">EcomProductCategoryFieldTranslation</xsl:variable>
  <xsl:variable name="categoryFieldValuesTableName">EcomProductCategoryFieldValue</xsl:variable>
  <xsl:variable name="categorySystemNamePrefix">GDSN</xsl:variable>
  <xsl:variable name="categoryTranslationNamePrefix">GDSN - </xsl:variable>
  <xsl:variable name="generalFieldsCategorySystemName">GDSNGeneralFields</xsl:variable>
  <xsl:variable name="generalFieldsCategoryName">GDSN - General Fields</xsl:variable>
  <xsl:variable name="defaultLanguage">en</xsl:variable>
  <xsl:variable name="allowedSymbols" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'"/>

  <xsl:key name="value-by-code" match="values/value" use="@code"/>
  <xsl:key name="subgroup-by-code" match="group/values/group" use="@code"/>
  <xsl:key name="product-language-category-by-code" match="values/group/values/multiLanguage" use="@code"/>
  <xsl:key name="product-category-field-by-code-and-language" match="values/group/values/value" use="concat(@code, '-', ancestor::item[1]/@DwProductLanguageId)"/>
  <xsl:key name="product-general-category-field-by-code-and-language" match="item/values/value" use="concat(@code, '-', ../../@DwProductLanguageId)"/>
  <xsl:key name="product-category-advanced-field-by-code-and-language" match="values/group/values/group" use="concat(@code, '-', ../../../../@DwProductLanguageId)"/>
  <xsl:key name="product-language-category-by-code-and-language" match="values/group/values/multiLanguage" use="concat(@code, '-', ../../../../@DwProductLanguageId)"/>
  <xsl:key name="product-category-by-code" match="group" use="@code"/>
  <xsl:key name="product-category-translation-by-code" match="item/values/group" use="concat(@code, '-', ../../@DwProductLanguageId)"/>
  <xsl:key name="attribute-by-code" match="metadata/attributes/attribute" use="@code"/>
  <xsl:key name="attribute-by-module" match="metadata/attributes/attribute" use="@module"/>
  <xsl:key name="codeList-by-code" match="metadata/optionCodes/list" use="@code"/>

  <xsl:variable name="referenceCategories">
    <xsl:for-each select="/root/metadata/attributes/attribute[not(preceding::attribute/@module = @module)]">
      <referenceCategory name="{@module}">
        <xsl:value-of select="translate(@module, translate(@module, $allowedSymbols, '-'), '-')"/>
      </referenceCategory >
    </xsl:for-each>
  </xsl:variable>

  <xsl:variable name="recognizedFields">
    <field code="iden0000">ProductEan</field>
    <field code="desc0036">ProductName</field>
    <field code="desc0002">ProductShortDescription</field>
    <field code="desc0013">ProductLongDescription</field>
    <field code="meas0002">ProductDepth</field>
    <field code="meas0008">ProductHeight</field>
    <field code="meas0029">ProductWidth</field>
    <field code="meas0067">ProductWeight</field>
  </xsl:variable>
  <xsl:variable name="recognizedFieldsNodeSet" select="msxsl:node-set($recognizedFields)" />

  <xsl:template match="/root">
    <tables>
      <xsl:call-template name="ProductTable" />
      <xsl:call-template name="CategoryTable"/>
      <xsl:call-template name="CategoryFieldTable" />
      <xsl:call-template name="CategoryFieldTranslationTable" />
      <xsl:call-template name="CategoryFieldValueTable" />
    </tables>
  </xsl:template>

  <xsl:template name="ProductTable">
    <table tableName="{$productsTableName}">
      <xsl:apply-templates select="item[@uniqueId > -1]" mode="ProductTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="item" mode="ProductTableRow">
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
        <xsl:value-of select="@DwProductNumber"/>
      </column>
      <column columnName="DataFetched">
        <xsl:value-of select="@DataFetched"/>
      </column>
      <column columnName="ProductFoundInGDSN">
        <xsl:value-of select="count(*) > 0"/>
      </column>
      <column columnName="ProductUpdated">
        <xsl:value-of select="@DataFetched"/>
      </column>
      <xsl:apply-templates select="values/value" mode="ProductValue"/>
      <xsl:apply-templates select="values/multiLanguage" mode="ProductMultiLanguageValue"/>
    </item>
  </xsl:template>

  <xsl:template match="value" mode="ProductValue">
    <xsl:variable name="code" select="@code" />
    <xsl:variable name="recognizedFieldCode" select="$recognizedFieldsNodeSet/field[@code = $code]"/>
    <xsl:if test="$recognizedFieldCode">
      <column columnName="{$recognizedFieldCode/text()}">
        <xsl:value-of select="text()"/>
      </column>
    </xsl:if>
  </xsl:template>

  <xsl:template match="multiLanguage" mode="ProductMultiLanguageValue">
    <xsl:variable name="code" select="@code" />
    <xsl:variable name="recognizedFieldCode" select="$recognizedFieldsNodeSet/field[@code = $code]"/>
    <xsl:if test="$recognizedFieldCode">
      <column columnName="{$recognizedFieldCode/text()}">
        <xsl:apply-templates select="." mode="LanguageVersion" />
      </column>
    </xsl:if>
  </xsl:template>

  <xsl:template match="multiLanguage" mode="LanguageVersion">
    <xsl:variable name="currentlang" select="ancestor::item[1]/@DwProductLanguageIdCode" />
    <xsl:choose>
      <xsl:when test="value[@language=$currentlang]">
        <xsl:value-of select="value[@language=$currentlang]"/>
      </xsl:when>
      <xsl:when test="value[@language=$defaultLanguage]">
        <xsl:value-of select="value[@language=$defaultLanguage]"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="value"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="CategoryTable">
    <xsl:variable name="referenceCatName" select="key('attribute-by-code', @code)/@module" />
    <xsl:variable name="referenceCategoriesNodeSet" select="msxsl:node-set($referenceCategories)" />
    <xsl:variable name="nonUniqueCategoryIds">
      <xsl:for-each select="item/values/group">
        <xsl:variable name="name" select="key('attribute-by-code', @code)/@module" />
        <xsl:variable name="currentlang" select="ancestor::item[1]/@DwProductLanguageId" />
        <categoryId name="{$name}" languageId="{$currentlang}">
          <xsl:value-of select="$referenceCategoriesNodeSet/referenceCategory[@name=$name]"/>
        </categoryId>
      </xsl:for-each>
    </xsl:variable>
    <xsl:variable name="nonUniqueCategoryIdsNodeSet" select="msxsl:node-set($nonUniqueCategoryIds)" />
    <table tableName="{$categoriesTableName}">
      <xsl:for-each select="$nonUniqueCategoryIdsNodeSet/categoryId">
        <xsl:variable name="categoryId" select="$nonUniqueCategoryIdsNodeSet/categoryId[text()=current()]" />
        <xsl:if test="generate-id() = generate-id($categoryId)">
          <item table="{$categoriesTableName}">
            <column columnName="CategoryId">
              <xsl:value-of select="concat($categorySystemNamePrefix, current())"/>
            </column>
            <column columnName="CategoryType">2</column>
            <column columnName="CategoryProductProperties">False</column>
          </item>
        </xsl:if>
      </xsl:for-each>
      <xsl:for-each select="item/values/value[@code='iden0001']">
        <xsl:variable name="firstGpc" select="/root/item/values/value[@code = 'iden0001' and text() = current()]" />
        <xsl:if test="generate-id() = generate-id($firstGpc)">
          <item table="{$categoriesTableName}">
            <column columnName="CategoryId">
              <xsl:value-of select="concat($categorySystemNamePrefix, current())"/>
            </column>
            <column columnName="CategoryType">1</column>
            <column columnName="CategoryProductProperties">True</column>
          </item>
        </xsl:if>
      </xsl:for-each>
      <item table="{$categoriesTableName}">
        <column columnName="CategoryId">
          <xsl:value-of select="$generalFieldsCategorySystemName"/>
        </column>
        <column columnName="CategoryType">1</column>
        <column columnName="CategoryProductProperties">True</column>
      </item>
    </table>
    <table tableName="{$categoryTranslationsTableName}">
      <xsl:for-each select="$nonUniqueCategoryIdsNodeSet/categoryId">
        <xsl:variable name="categoryId" select="$nonUniqueCategoryIdsNodeSet/categoryId[text()=current()]" />
        <xsl:if test="generate-id() = generate-id($categoryId)">
          <item table="{$categoryTranslationsTableName}">
            <column columnName="CategoryTranslationCategoryId">
              <xsl:value-of select="concat($categorySystemNamePrefix, current())"/>
            </column>
            <column columnName="CategoryTranslationLanguageId">
              <xsl:value-of select="@languageId"/>
            </column>
            <column columnName="CategoryTranslationCategoryName">
              <xsl:value-of select="concat($categoryTranslationNamePrefix, @name)"/>
            </column>
          </item>
        </xsl:if>
      </xsl:for-each>
      <xsl:for-each select="item/values/value[@code='iden0001']">
        <xsl:variable name="firstGpc" select="/root/item/values/value[@code = 'iden0001' and text() = current()]" />
        <xsl:variable name="categoryName" select="/root/metadata/gpcCodes/gpc[@code = current()]" />
        <xsl:if test="generate-id() = generate-id($firstGpc)">
          <item table="{$categoryTranslationsTableName}">
            <column columnName="CategoryTranslationCategoryId">
              <xsl:value-of select="concat($categorySystemNamePrefix, current())"/>
            </column>
            <column columnName="CategoryTranslationLanguageId">
              <xsl:value-of select="../../@DwProductLanguageId"/>
            </column>
            <column columnName="CategoryTranslationCategoryName">
              <xsl:value-of select="concat($categoryTranslationNamePrefix, $categoryName)"/>
            </column>
          </item>
        </xsl:if>
      </xsl:for-each>

      <xsl:for-each select="/root/item">        
        <xsl:variable name="languageId" select="@DwProductLanguageId" />
        <xsl:if test="generate-id() = generate-id(/root/item[@DwProductLanguageId = $languageId])">
          <item table="{$categoryTranslationsTableName}">
            <column columnName="CategoryTranslationCategoryId">
              <xsl:value-of select="$generalFieldsCategorySystemName"/>
            </column>
            <column columnName="CategoryTranslationLanguageId">
              <xsl:value-of select="@DwProductLanguageId"/>
            </column>
            <column columnName="CategoryTranslationCategoryName">
              <xsl:value-of select="$generalFieldsCategoryName"/>
            </column>
          </item>
        </xsl:if>
      </xsl:for-each>
    </table>
  </xsl:template>

  <xsl:template name="CategoryFieldTable">
    <table tableName="{$categoryFieldsTableName}">
      <xsl:apply-templates select="item/values/value" mode="GeneralCategoryFieldTableRow"/>
      <xsl:apply-templates select="item/values/group/values/value" mode="CategoryFieldTableRow"/>
      <xsl:apply-templates select="item/values/group/values/multiLanguage" mode="MultiLanguageFieldRow" />
      <xsl:apply-templates select="item/values/group/values/group" mode="CategoryAdvancedXmlFieldTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="item/values/value" mode="GeneralCategoryFieldTableRow">
    <xsl:variable name="categoryField" select="key('value-by-code', @code)" />
    <xsl:variable name="code" select="@code" />
    <xsl:variable name="recognizedFieldCode" select="$recognizedFieldsNodeSet/field[@code = $code]"/>
    <xsl:if test="generate-id() = generate-id($categoryField) and not($recognizedFieldCode)">
      <item table="{$categoryFieldsTableName}">
        <column columnName="FieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldForeignCategoryId" />
        <column columnName="FieldCategoryId">
          <xsl:value-of select="$generalFieldsCategorySystemName"/>
        </column>
        <column columnName="FieldTemplateTag">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldType">1</column>
        <column columnName="FieldHideEmpty">1</column>
        <column columnName="FieldPresentationType">1</column>
        <column columnName="FieldSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template match="group/values/value" mode="CategoryFieldTableRow">
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <xsl:variable name="categoryField" select="key('value-by-code', @code)" />
    <xsl:variable name="referenceCatName" select="key('attribute-by-code', @code)/@module" />
    <xsl:variable name="foreignCatId" select="msxsl:node-set($referenceCategories)/*[@name=$referenceCatName]" />
    <xsl:if test="generate-id() = generate-id($categoryField)">
      <item table="{$categoryFieldsTableName}">
        <column columnName="FieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldForeignCategoryId" />
        <column columnName="FieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldTemplateTag">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldType">1</column>
        <column columnName="FieldHideEmpty">1</column>
        <column columnName="FieldPresentationType">1</column>
        <column columnName="FieldSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
      <item table="{$categoryFieldsTableName}">
        <column columnName="FieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldForeignCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
        </column>
        <column columnName="FieldTemplateTag">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldType">1</column>
        <column columnName="FieldHideEmpty">1</column>
        <column columnName="FieldPresentationType">1</column>
        <column columnName="FieldSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template match="group/values/multiLanguage" mode="MultiLanguageFieldRow">
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <xsl:variable name="categoryField" select="key('value-by-code', @code)" />
    <xsl:variable name="referenceCatName" select="key('attribute-by-code', @code)/@module" />
    <xsl:variable name="currentlang" select="ancestor::item[1]/@DwProductLanguageIdCode" />
    <xsl:variable name="foreignCatId" select="msxsl:node-set($referenceCategories)/*[@name=$referenceCatName]" />
    <xsl:if test="generate-id() = generate-id($categoryField)">
      <item table="{$categoryFieldsTableName}">
        <column columnName="FieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldForeignCategoryId" />
        <column columnName="FieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldTemplateTag">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldType">1</column>
        <column columnName="FieldHideEmpty">1</column>
        <column columnName="FieldPresentationType">1</column>
        <column columnName="FieldSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
      <item table="{$categoryFieldsTableName}">
        <column columnName="FieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldForeignCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
        </column>
        <column columnName="FieldTemplateTag">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldType">1</column>
        <column columnName="FieldHideEmpty">1</column>
        <column columnName="FieldPresentationType">1</column>
        <column columnName="FieldSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template match="group/values/group" mode="CategoryAdvancedXmlFieldTableRow">
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <xsl:variable name="categoryField" select="key('subgroup-by-code', @code)" />
    <xsl:variable name="referenceCatName" select="key('attribute-by-code', @code)/@module" />
    <xsl:variable name="foreignCatId" select="msxsl:node-set($referenceCategories)/*[@name=$referenceCatName]" />
    <xsl:if test="generate-id() = generate-id($categoryField)">
      <item table="{$categoryFieldsTableName}">
        <column columnName="FieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldForeignCategoryId" />
        <column columnName="FieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldTemplateTag">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldType">
          <xsl:value-of select="/root/metadata/fieldType/@id"/>
        </column>
        <column columnName="FieldHideEmpty">1</column>
        <column columnName="FieldPresentationType">1</column>
        <column columnName="FieldSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
      <item table="{$categoryFieldsTableName}">
        <column columnName="FieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldForeignCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
        </column>
        <column columnName="FieldTemplateTag">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldType">
          <xsl:value-of select="/root/metadata/fieldType/@id"/>
        </column>
        <column columnName="FieldHideEmpty">1</column>
        <column columnName="FieldPresentationType">1</column>
        <column columnName="FieldSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template name="CategoryFieldTranslationTable">
    <table tableName="{$categoryFieldTranslationsTableName}">
      <xsl:apply-templates select="item/values/value" mode="GeneralCategoryFieldTranslationTableRow"/>
      <xsl:apply-templates select="item/values/group/values/value" mode="CategoryFieldTranslationTableRow"/>
      <xsl:apply-templates select="item/values/group/values/multiLanguage" mode="MultiLanguageFieldTranslationRow" />
      <xsl:apply-templates select="item/values/group/values/group" mode="CategoryAdvancedXmlFieldTranslationTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="item/values/value" mode="GeneralCategoryFieldTranslationTableRow">
    <xsl:variable name="currentLangId" select="ancestor::item[1]/@DwProductLanguageId" />
    <xsl:variable name="code" select="@code" />
    <xsl:variable name="recognizedFieldCode" select="$recognizedFieldsNodeSet/field[@code = $code]"/>
    <xsl:if test="generate-id() = generate-id(key('product-general-category-field-by-code-and-language', concat(@code, '-', ../../@DwProductLanguageId))) and not($recognizedFieldCode)">
      <item table="{$categoryFieldTranslationsTableName}">
        <column columnName="FieldTranslationFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldTranslationFieldCategoryId">
          <xsl:value-of select="$generalFieldsCategorySystemName"/>
        </column>
        <column columnName="FieldTranslationLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldTranslationFieldLabel">
          <xsl:value-of select="key('attribute-by-code', @code)"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template match="group/values/value" mode="CategoryFieldTranslationTableRow">
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <xsl:variable name="currentLangId" select="ancestor::item[1]/@DwProductLanguageId" />
    <xsl:variable name="referenceCatName" select="key('attribute-by-code', @code)/@module" />
    <xsl:variable name="foreignCatId" select="msxsl:node-set($referenceCategories)/*[@name=$referenceCatName]" />
    <xsl:if test="generate-id() = generate-id(key('product-category-field-by-code-and-language', concat(@code, '-', $currentLangId)))">
      <item table="{$categoryFieldTranslationsTableName}">
        <column columnName="FieldTranslationFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldTranslationFieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
        </column>
        <column columnName="FieldTranslationLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldTranslationFieldLabel">
          <xsl:value-of select="concat(key('attribute-by-code', ../../@code), concat(' : ', key('attribute-by-code', @code)))"/>
        </column>
      </item>
      <item table="{$categoryFieldTranslationsTableName}">
        <column columnName="FieldTranslationFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldTranslationFieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldTranslationLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldTranslationFieldLabel">
          <xsl:value-of select="concat(key('attribute-by-code', ../../@code), concat(' : ', key('attribute-by-code', @code)))"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template match="group/values/multiLanguage" mode="MultiLanguageFieldTranslationRow">
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <xsl:variable name="currentLangId" select="ancestor::item[1]/@DwProductLanguageId" />
    <xsl:variable name="referenceCatName" select="key('attribute-by-code', @code)/@module" />
    <xsl:variable name="foreignCatId" select="msxsl:node-set($referenceCategories)/*[@name=$referenceCatName]" />
    <xsl:if test="generate-id() = generate-id(key('product-language-category-by-code-and-language', concat(@code, '-', ../../../../@DwProductLanguageId)))">
      <item table="{$categoryFieldTranslationsTableName}">
        <column columnName="FieldTranslationFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldTranslationFieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
        </column>
        <column columnName="FieldTranslationLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldTranslationFieldLabel">
          <xsl:value-of select="concat(key('attribute-by-code', ../../@code), concat(': ', key('attribute-by-code', @code)))"/>
        </column>
      </item>
      <item table="{$categoryFieldTranslationsTableName}">
        <column columnName="FieldTranslationFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldTranslationFieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldTranslationLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldTranslationFieldLabel">
          <xsl:value-of select="concat(key('attribute-by-code', ../../@code), concat(': ', key('attribute-by-code', @code)))"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template match="group/values/group" mode="CategoryAdvancedXmlFieldTranslationTableRow">
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <xsl:variable name="currentLangId" select="ancestor::item[1]/@DwProductLanguageId" />
    <xsl:variable name="referenceCatName" select="key('attribute-by-code', @code)/@module" />
    <xsl:variable name="foreignCatId" select="msxsl:node-set($referenceCategories)/*[@name=$referenceCatName]" />
    <xsl:if test="generate-id() = generate-id(key('product-category-advanced-field-by-code-and-language', concat(@code, '-', ../../../../@DwProductLanguageId)))">
      <item table="{$categoryFieldTranslationsTableName}">
        <column columnName="FieldTranslationFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldTranslationFieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
        </column>
        <column columnName="FieldTranslationLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldTranslationFieldLabel">
          <xsl:value-of select="concat(key('attribute-by-code', ../../@code), concat(' : ', key('attribute-by-code', @code)))"/>
        </column>
      </item>
      <item table="{$categoryFieldTranslationsTableName}">
        <column columnName="FieldTranslationFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldTranslationFieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $foreignCatId)"/>
        </column>
        <column columnName="FieldTranslationLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldTranslationFieldLabel">
          <xsl:value-of select="concat(key('attribute-by-code', ../../@code), concat(' : ', key('attribute-by-code', @code)))"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template name="CategoryFieldValueTable">
    <table tableName="{$categoryFieldValuesTableName}">
      <xsl:apply-templates select="item/values/value" mode="GeneralCategoryFieldValueTableRow"/>
      <xsl:apply-templates select="item/values/group/values/value" mode="CategoryFieldValueTableRow"/>
      <xsl:apply-templates select="item/values/group/values/multiLanguage" mode="CategoryLanguageFieldValueTableRow"/>
      <xsl:apply-templates select="item/values/group/values/group" mode="CategoryAdvancedXmlFieldValueTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="item/values/value" mode="GeneralCategoryFieldValueTableRow">
    <xsl:variable name="currentProductId" select="ancestor::item[1]/@DwProductId" />
    <xsl:variable name="currentVariantId" select="ancestor::item[1]/@DwProductVariantId" />
    <xsl:variable name="currentLangId" select="ancestor::item[1]/@DwProductLanguageId" />
    <xsl:variable name="code" select="@code" />
    <xsl:variable name="recognizedFieldCode" select="$recognizedFieldsNodeSet/field[@code = $code]"/>

    <xsl:if test="not($recognizedFieldCode)">
      <item table="{$categoryFieldValuesTableName}">
        <column columnName="FieldValueFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldValueFieldCategoryId">
          <xsl:value-of select="$generalFieldsCategorySystemName"/>
        </column>
        <column columnName="FieldValueProductId">
          <xsl:value-of select="$currentProductId"/>
        </column>
        <column columnName="FieldValueProductVariantId">
          <xsl:value-of select="$currentVariantId"/>
        </column>
        <column columnName="FieldValueProductLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldValueValue">
          <xsl:value-of select="text()"/>
        </column>
        <column columnName="FieldValueSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template match="group/values/value" mode="CategoryFieldValueTableRow">
    <xsl:variable name="currentProductId" select="ancestor::item[1]/@DwProductId" />
    <xsl:variable name="currentVariantId" select="ancestor::item[1]/@DwProductVariantId" />
    <xsl:variable name="currentLangId" select="ancestor::item[1]/@DwProductLanguageId" />
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <item table="{$categoryFieldValuesTableName}">
      <column columnName="FieldValueFieldId">
        <xsl:value-of select="@code"/>
      </column>
      <column columnName="FieldValueFieldCategoryId">
        <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
      </column>
      <column columnName="FieldValueProductId">
        <xsl:value-of select="$currentProductId"/>
      </column>
      <column columnName="FieldValueProductVariantId">
        <xsl:value-of select="$currentVariantId"/>
      </column>
      <column columnName="FieldValueProductLanguageId">
        <xsl:value-of select="$currentLangId"/>
      </column>
      <column columnName="FieldValueValue">
        <xsl:value-of select="text()"/>
      </column>
      <column columnName="FieldValueSortOrder">
        <xsl:value-of select="position()-1"/>
      </column>
    </item>
  </xsl:template>

  <xsl:template match="group/values/multiLanguage" mode="CategoryLanguageFieldValueTableRow">
    <xsl:variable name="currentLang" select="ancestor::item[1]/@DwProductLanguageIdCode" />
    <xsl:variable name="currentProductId" select="ancestor::item[1]/@DwProductId" />
    <xsl:variable name="currentVariantId" select="ancestor::item[1]/@DwProductVariantId" />
    <xsl:variable name="currentLangId" select="ancestor::item[1]/@DwProductLanguageId" />
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <xsl:if test="value[@language=$currentLang]">
      <item table="{$categoryFieldValuesTableName}">
        <column columnName="FieldValueFieldId">
          <xsl:value-of select="@code"/>
        </column>
        <column columnName="FieldValueFieldCategoryId">
          <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
        </column>
        <column columnName="FieldValueProductId">
          <xsl:value-of select="$currentProductId"/>
        </column>
        <column columnName="FieldValueProductVariantId">
          <xsl:value-of select="$currentVariantId"/>
        </column>
        <column columnName="FieldValueProductLanguageId">
          <xsl:value-of select="$currentLangId"/>
        </column>
        <column columnName="FieldValueValue">
          <xsl:value-of select="value"/>
        </column>
        <column columnName="FieldValueSortOrder">
          <xsl:value-of select="position()-1"/>
        </column>
      </item>
    </xsl:if>
  </xsl:template>

  <xsl:template match="group/values/group" mode="CategoryAdvancedXmlFieldValueTableRow">
    <xsl:variable name="currentProductId" select="ancestor::item[1]/@DwProductId" />
    <xsl:variable name="currentVariantId" select="ancestor::item[1]/@DwProductVariantId" />
    <xsl:variable name="currentLangId" select="ancestor::item[1]/@DwProductLanguageId" />
    <xsl:variable name="currentGpc" select="ancestor::item[1]/values/value[@code = 'iden0001']" />
    <item table="{$categoryFieldValuesTableName}">
      <column columnName="FieldValueFieldId">
        <xsl:value-of select="@code"/>
      </column>
      <column columnName="FieldValueFieldCategoryId">
        <xsl:value-of select="concat($categorySystemNamePrefix, $currentGpc)"/>
      </column>
      <column columnName="FieldValueProductId">
        <xsl:value-of select="$currentProductId"/>
      </column>
      <column columnName="FieldValueProductVariantId">
        <xsl:value-of select="$currentVariantId"/>
      </column>
      <column columnName="FieldValueProductLanguageId">
        <xsl:value-of select="$currentLangId"/>
      </column>
      <column columnName="FieldValueValue">
        <xsl:text disable-output-escaping="yes">&lt;![CDATA[</xsl:text>
        <root>
          <metadata>
            <xsl:apply-templates select="descendant::value[@code]" mode="AdvancedDataMeta" />
          </metadata>
          <xsl:apply-templates select="current()" mode="AdvancedDataTransform" />
        </root>
        <xsl:text disable-output-escaping="yes">]]&gt;</xsl:text>
      </column>
      <column columnName="FieldValueSortOrder">
        <xsl:value-of select="position()-1"/>
      </column>
    </item>
  </xsl:template>

  <xsl:template match="*[@code]" mode="AdvancedDataTransform">
    <xsl:variable name="categoryField" select="key('attribute-by-code', @code)" />
    <xsl:element name="{local-name(.)}">
      <xsl:attribute name="name">
        <xsl:value-of select="$categoryField" />
      </xsl:attribute>
      <xsl:apply-templates select="@*|node()" mode="AdvancedDataInnerTransform" />
    </xsl:element>
  </xsl:template>

  <xsl:template match="value" mode="AdvancedDataMeta">
    <xsl:if test="generate-id() = generate-id(key('value-by-code',@code))">
      <xsl:copy-of select="key('codeList-by-code', @code)" />
    </xsl:if>
  </xsl:template>


  <xsl:template match="@*|node()" mode="AdvancedDataTransform" priority="-1">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()" mode="AdvancedDataInnerTransform" />
    </xsl:copy>
  </xsl:template>

  <xsl:template match="@*|node()"  mode="AdvancedDataInnerTransform" >
    <xsl:copy>
      <xsl:apply-templates select="@*|node()" mode="AdvancedDataTransform" />
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
