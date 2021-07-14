<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" version="1.0">
  <xsl:output method="xml" indent="yes" xml:space="preserve" omit-xml-declaration="yes" />

  <xsl:key name="name-by-value" match="metadata/list/item" use="concat(../@code, '-', @code)"/>

  <xsl:template match="/root">
    <xsl:apply-templates select="group" mode="group"/>
  </xsl:template>

  <xsl:template match="group" mode="group">
    <xsl:choose>
      <xsl:when test="count(values) = 1">
        <xsl:value-of select="@name"/>
        <xsl:text>&#10;</xsl:text>
        <xsl:apply-templates select="values/value" mode="value"/>
        <xsl:apply-templates select="values/multiLanguage" mode="value" />
        <xsl:apply-templates select="values/group" mode="group"/>
        <xsl:text>&#10;</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>&#10;</xsl:text>
        <xsl:apply-templates select="values" mode="valueList"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="group/values/multiLanguage|group/values/value" mode="value">
    <xsl:variable name="user-friendly-name" select="key('name-by-value', concat(@code, '-', text()))" />
    <xsl:choose>
      <xsl:when test="$user-friendly-name">
        <xsl:value-of select="@name"/>: <xsl:value-of select="$user-friendly-name"/>(<xsl:value-of select="text()"/>)
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="@name"/>: <xsl:value-of select="text()"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="values" mode="valueList">
    <xsl:value-of select="../@name"/>(<xsl:value-of select="@index"/>)
    <xsl:apply-templates select="value" mode="value" />
    <xsl:apply-templates select="multiLanguage" mode="value" />
    <xsl:text>&#10;</xsl:text>
  </xsl:template>

</xsl:stylesheet>
