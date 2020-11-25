<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="Template" />
	</xsl:template>
	
	<xsl:template match="Template">
		<xsl:apply-templates select="loop[@name='Details'][item]" />
	</xsl:template>
	
	<xsl:template match="loop[@name='Details']">
		<table border="0" cellpadding="2" cellspacing="2">
			<xsl:apply-templates select="item" />
		</table>
	</xsl:template>
	
	<xsl:template match="item">
		<tr>
			<xsl:apply-templates select="Name" />
			<xsl:apply-templates select="Value" />
		</tr>
	</xsl:template>
	
	<xsl:template match="Name">
		<th>
			<xsl:value-of select="." disable-output-escaping="yes" />
		</th>
	</xsl:template>
	
	<xsl:template match="Value">
		<td>
			<xsl:value-of select="." disable-output-escaping="yes" />
		</td>
	</xsl:template>
	
</xsl:stylesheet>