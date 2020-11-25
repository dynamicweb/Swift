<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
  <xsl:param name="html-content-type" />
  <xsl:template match="/Template">
	<images>
	<xsl:for-each select="loop[@name='Images']/item">
	  <thumb>
			<xsl:value-of select="Gallery.Image.Thumb.Large.Path" disable-output-escaping="no"/>
	  </thumb>
	</xsl:for-each>
  </images>
  </xsl:template>
</xsl:stylesheet>