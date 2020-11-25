<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
  <xsl:template match="/">
        <table>
          <tr>
            <xsl:for-each select="View/Columns/Column">
              <th>
                <xsl:value-of select="current()"/>
              </th>
            </xsl:for-each>
          </tr>
          <xsl:for-each select="View/Rows/Row">
            <tr>
              <xsl:for-each select="Value">
                <td>
                  <xsl:value-of select="current()"/>
                </td>
              </xsl:for-each>
            </tr>
          </xsl:for-each>
        </table>
  </xsl:template>
</xsl:stylesheet>
