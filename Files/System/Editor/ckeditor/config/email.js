/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
        { name: 'etags' },
		{ name: 'about' }
	];

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript,NewPage,Save';

	// Se the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Make dialogs simpler.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	// Dynamicweb
	config.removePlugins = 'save, newpage, preview, print, templates, flash, smiley, pagebreak, iframe, font, forms, colorbutton, bidi, div';

	config.entities = false;

	config.filebrowserBrowseUrl = '/Admin/Editor/ckeditor/browser.aspx?type=link';
	config.filebrowserImageBrowseUrl = '/Admin/Editor/ckeditor/browser.aspx?type=image';
	config.filebrowserImageBrowseLinkUrl = "/Admin/Editor/ckeditor/browser.aspx?type=image&tab=Link";
	config.filebrowserLinkWindowWidth = '600';
	config.filebrowserLinkWindowHeight = '50';

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
