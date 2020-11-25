<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes"/>

  <xsl:variable name="ordersTableName">EcomOrders</xsl:variable>
  <xsl:variable name="orderLinesTableName">EcomOrderLines</xsl:variable>

  <xsl:template match="/root">
    <tables>
      <xsl:call-template name="OrderTable" />
      <xsl:call-template name="OrderLineTable"/>
    </tables>
  </xsl:template>

  <xsl:template name="OrderTable">
    <table tableName="{$ordersTableName}">
      <xsl:apply-templates select="Order" mode="OrderTableRow"/>
    </table>
  </xsl:template>

  <xsl:template match="Order" mode="OrderTableRow">
    <item table="{$ordersTableName}">
      <column columnName="OrderId">
        <xsl:value-of select="Id"/>
      </column>
      <column columnName="OrderIntegrationOrderId">
        <xsl:value-of select="@DwTaskName"/>
      </column>
      <column columnName="OrderShopId">
        <xsl:value-of select="ShopId"/>
      </column>
      <column columnName="OrderDate">
        <xsl:value-of select="Created"/>
      </column>
      <column columnName="OrderModified">
        <xsl:value-of select="Modified"/>
      </column>
      <column columnName="OrderComplete">1</column>
      <column columnName="OrderStateId">
        <xsl:value-of select="@DwStateId" />
      </column>
      <column columnName="OrderGatewayPaymentStatus">Paid</column>
      <column columnName="OrderCurrencyCode">
        <xsl:value-of select="Data/Price/Currency" />
      </column>
      <column columnName="OrderPaymentMethod">
        <xsl:value-of select="Data/Price/PaymentMethod" />
      </column>
      <xsl:variable name="paymentFee" select="number(Data/Price/TransactionFee/text())" />
      <xsl:variable name="orderTotalPrice" select="number(Data/Price/Total/text())+$paymentFee" />
      <column columnName="OrderPaymentFeeWithVAT">
        <xsl:value-of select="$paymentFee" />
      </column>
      <column columnName="OrderShippingFeeWithVAT">
        <xsl:value-of select="Data/Price/Shipping" />
      </column>
      <column columnName="OrderPriceWithVAT">
        <xsl:value-of select="$orderTotalPrice" />
      </column>
      <column columnName="OrderPriceWithoutVAT">
        <xsl:value-of select="$orderTotalPrice" />
      </column>
      <column columnName="OrderPriceBeforeFeesWithoutVAT">
        <xsl:value-of select="$orderTotalPrice" />
      </column>

      <xsl:apply-templates select="Data/Billing" mode="OrderTableRow" />
      <xsl:apply-templates select="Data/Shipping" mode="OrderTableRow" />
     </item>
  </xsl:template>

  <xsl:template match="Billing" mode="OrderTableRow">
    <column columnName="OrderCustomerCompany">
      <xsl:value-of select="Company" />
    </column>
    <column columnName="OrderCustomerCountry">
      <xsl:value-of select="CountryCode" />
    </column>
    <column columnName="OrderCustomerCountryCode">
      <xsl:value-of select="CountryCode" />
    </column>
    <column columnName="OrderCustomerRegion">
      <xsl:value-of select="RegionCode" />
    </column>
    <column columnName="OrderCustomerCity">
      <xsl:value-of select="City" />
    </column>
    <column columnName="OrderCustomerZip">
      <xsl:value-of select="Zip" />
    </column>
    <column columnName="OrderCustomerAddress">
      <xsl:value-of select="Address1" />
    </column>
    <column columnName="OrderCustomerAddress2">
      <xsl:value-of select="Address2" />
    </column>
    <column columnName="OrderCustomerHouseNumber">
      <xsl:value-of select="HouseNumber" />
      <xsl:if test="HouseNumberExt/text()">
        <xsl:text> / </xsl:text>
        <xsl:value-of select="HouseNumberExt" />
      </xsl:if>
    </column>
    <column columnName="OrderCustomerVatRegNumber">
      <xsl:value-of select="VatNumber" />
    </column>
    <column columnName="OrderCustomerEmail">
      <xsl:value-of select="../Customer/Email" />
    </column>
    <column columnName="OrderCustomerFirstName">
      <xsl:value-of select="../Customer/FirstName" />
    </column>
    <column columnName="OrderCustomerName">
      <xsl:value-of select="../Customer/LastName" />
    </column>
    <column columnName="OrderCustomerPhone">
      <xsl:value-of select="../Customer/Phone" />
    </column>
    <column columnName="OrderCustomerCell">
      <xsl:value-of select="../Customer/Mobile" />
    </column>
  </xsl:template>

  <xsl:template match="Shipping" mode="OrderTableRow">
    <column columnName="OrderDeliveryCompany">
      <xsl:value-of select="Company" />
    </column>
    <column columnName="OrderDeliveryCountry">
      <xsl:value-of select="CountryCode" />
    </column>
    <column columnName="OrderDeliveryCountryCode">
      <xsl:value-of select="CountryCode" />
    </column>
    <column columnName="OrderDeliveryRegion">
      <xsl:value-of select="RegionCode" />
    </column>
    <column columnName="OrderDeliveryCity">
      <xsl:value-of select="City" />
    </column>
    <column columnName="OrderDeliveryZip">
      <xsl:value-of select="Zip" />
    </column>
    <column columnName="OrderDeliveryAddress">
      <xsl:value-of select="Address1" />
    </column>
    <column columnName="OrderDeliveryAddress2">
      <xsl:value-of select="Address2" />
    </column>
    <column columnName="OrderDeliveryHouseNumber">
      <xsl:value-of select="HouseNumber" />
      <xsl:if test="HouseNumberExt/text()">
        <xsl:text> / </xsl:text>
        <xsl:value-of select="HouseNumberExt" />
      </xsl:if>
    </column>
    <column columnName="OrderDeliveryEmail">
      <xsl:value-of select="Email" />
    </column>
    <column columnName="OrderDeliveryFirstName">
      <xsl:value-of select="../Customer/FirstName" />
    </column>
    <column columnName="OrdeDeliveryName">
      <xsl:value-of select="../Customer/LastName" />
    </column>
    <column columnName="OrdeDeliveryPhone">
      <xsl:value-of select="../Customer/Phone" />
    </column>
    <column columnName="OrderDeliveryCell">
      <xsl:value-of select="../Customer/Mobile" />
    </column>
  </xsl:template>

  <xsl:template name="OrderLineTable">
    <table tableName="{$orderLinesTableName}">
      <xsl:apply-templates select="Order/Data/Products/Product" mode="OrderLineTableOrderLineRow" />
    </table>
  </xsl:template>

  <xsl:template match="Order/Data/Products/Product" mode="OrderLineTableOrderLineRow">
    <xsl:param name="orderId" select="../../../Id/text()" />
    <xsl:param name="orderCreated" select="../../../Created/text()" />
    <xsl:param name="orderModified" select="../../../Modified/text()" />
    <item table="{$orderLinesTableName}">
      <column columnName="OrderLineId">
        <xsl:value-of select="concat($orderId, 'OL', position())" />
      </column>
      <column columnName="OrderLineOrderId">
        <xsl:value-of select="$orderId" />
      </column>
      <column columnName="OrderLineParentLineId"></column>
      <column columnName="OrderLineType">0</column>
      <column columnName="OrderLineDate">
        <xsl:value-of select="$orderCreated"/>
      </column>
      <column columnName="OrderLineModified">
        <xsl:value-of select="$orderModified"/>
      </column>
      <xsl:variable name="productId" select="substring-before(Id, '_')" />
      <xsl:variable name="remaining" select="substring-after(Id, '_')" />
      <xsl:variable name="variantId" select="substring-before($remaining, '_')" />
      <xsl:variable name="languageId" select="substring-after($remaining, '_')" />
      <column columnName="OrderLineProductId">
        <xsl:choose>
          <xsl:when test="$productId">
            <xsl:value-of select="$productId" />
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="Id" />
          </xsl:otherwise>
        </xsl:choose>
      </column>
      <column columnName="OrderLineProductVariantId">
        <xsl:value-of select="$variantId" />
      </column>
      <column columnName="OrderLineProductNumber">
        <xsl:value-of select="Ean" />
      </column>
      <column columnName="OrderLineProductName">
        <xsl:value-of select="Title" />
      </column>
      <column columnName="OrderLineQuantity">
        <xsl:value-of select="Quantity" />
      </column>
      <column columnName="OrderLineUnitPriceWithVAT">
        <xsl:value-of select="Price" />
      </column>
      <xsl:variable name="totalPrice" select="number(Price/text())*number(Quantity/text())" />
      <column columnName="OrderLinePriceWithVAT">
        <xsl:value-of select="$totalPrice" />
      </column>
      <column columnName="OrderLinePriceWithoutVAT">
        <xsl:value-of select="$totalPrice" />
      </column>
    </item>
  </xsl:template>
</xsl:stylesheet>
