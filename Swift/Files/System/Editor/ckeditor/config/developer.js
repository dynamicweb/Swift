/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	// Dynamicweb
	config.allowedContent = true;

	config.entities = false;

	config.filebrowserBrowseUrl = '/Admin/Editor/ckeditor/browser.aspx?type=link';
	config.filebrowserImageBrowseUrl = '/Admin/Editor/ckeditor/browser.aspx?type=image';
	config.filebrowserImageBrowseLinkUrl = "/Admin/Editor/ckeditor/browser.aspx?type=link";
	config.filebrowserLinkWindowWidth = '600';
	config.filebrowserLinkWindowHeight = '50';

    // Remove some buttons, provided by the standard plugins, which we don't need to have in the Standard(s) toolbar.
	config.removeButtons = 'NewPage,Save';

	config.wordcount = {
	    countHTML: false,           // Whether or not to include Html chars in the Char Count
	    maxWordCount: -1,           // Maximum allowed Word Count, -1 is default for unlimited
	    maxCharCount: -1,           // Maximum allowed Char Count, -1 is default for unlimited
	    showCharCount: true,        // Whether or not you want to show the Char Count
	    showWordCount: true,       // Whether or not you want to show the Word Count
	    showParagraphs: false,      // Whether or not you want to show the Paragraphs Count
	    countSpacesAsChars: true,   // Whether or not you want to count Spaces as Chars
	};
};
