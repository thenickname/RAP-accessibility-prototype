/*******************************************************************************
 * Copyright (c) 2011 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

qx.Class.define( "org.eclipse.rwt.test.tests.AriaComboMixinTest", {

  extend : qx.core.Object,
  
  construct : function() {
    this.base( arguments );
  },
  
  members : {
  	testComboIncludesMixin : function() {
      qx.Class.hasOwnMixin( org.eclipse.swt.widgets.Combo, org.eclipse.rwt.accessibility.AriaComboMixin );
    },
    
//test aria roles
    testTextfieldHasAriaComboboxRole : function() {
    	var combobox = new org.eclipse.swt.widgets.Combo();
    	combobox.addToDocument();
    	var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
    	testUtil.flush();
    	assertEquals( combobox._field.getInputElement().getAttribute( "role" ), "combobox" );
      combobox.destroy();
    },
    
    testListHasAriaListboxRole : function() {
    	var combobox = new org.eclipse.swt.widgets.Combo();
      combobox.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( combobox._list.getHtmlAttribute( "role" ), "listbox" );
      combobox.destroy();
    },
    
    testListItemsHaveAriaOptionRole : function() {
    	var combobox = new org.eclipse.swt.widgets.Combo();
      combobox.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      combobox.setItems( [ "item1", "item2", "item3" ] );
      var listItems = combobox._list.getItems();
      for( var i = 0; i < listItems.length; i++ ) {
        assertEquals( listItems[ i ].getHtmlAttribute( "role" ), "option" );
      }
      combobox.destroy();
    },
    
//test for html IDs
//IDs necessary for aria relationships
    testListHasHtmlId : function() {
    	var combobox = new org.eclipse.swt.widgets.Combo();
      combobox.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
    	var wm = org.eclipse.swt.WidgetManager.getInstance();
      var widgetId = wm.findIdByWidget( combobox );
      var listId = widgetId + "_aria_listbox";
      assertEquals( combobox._list.getHtmlAttribute( "id" ), listId );
      combobox.destroy();
    },
    
    testListItemsHaveHtmlId : function() {
    	var combobox = new org.eclipse.swt.widgets.Combo();
      combobox.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var widgetId = wm.findIdByWidget( combobox );
      combobox.setItems( [ "item1", "item2", "item3" ] );
      var listItems = combobox._list.getItems();
      for( var i = 0; i < listItems.length; i++ ) {
      	var listItemId = widgetId + "_aria_option_" + i;
        assertEquals( listItems[ i ].getHtmlAttribute( "id" ), listItemId );
      }
      combobox.destroy();
    },
    
//test relationships
    testAriaOwnsRelationship : function() {
    	var combobox = new org.eclipse.swt.widgets.Combo();
      combobox.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var textfield = combobox._field.getInputElement();
      var list = combobox._list;
      assertEquals( textfield.getAttribute( "aria-owns" ), list.getHtmlAttribute( "id" ) );
      combobox.destroy();
    },
    
    testAriaActivedescendantRelationship : function() {
    	var combobox = new org.eclipse.swt.widgets.Combo();
      combobox.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var textfield = combobox._field.getInputElement();
      combobox.setItems( [ "item1", "item2", "item3" ] );
      var textfield = combobox._field.getInputElement();
      var listItems = combobox._list.getItems();
      for( var i = 0; i < listItems.length; i++ ) {
      	combobox._setSelected( listItems[ i ] );
      	assertEquals( listItems[ i ].getHtmlAttribute( "id" ), textfield.getAttribute( "aria-activedescendant" ) );
      }
      combobox.destroy();
    },
    
    testAriaAutocompleteProperty : function() {
    	var combobox = new org.eclipse.swt.widgets.Combo();
      combobox.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var textfield = combobox._field.getInputElement();
      assertEquals( textfield.getAttribute( "aria-autocomplete" ), "list" );
      combobox.destroy();
    },
    
     testAriaLabelledBy : function() {
      var combo = new org.eclipse.swt.widgets.Combo();
      combo.addToDocument();
      var labelAtom = this._createLabel( "blub" );
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      combo.setLabelledBy( labelAtom );
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var labelAtomId = wm.findIdByWidget( labelAtom ) + "_aria_label";
      combo.addEventListener( "appear", function( event ) {
      	assertEquals( labelAtom.getHtmlAttribute( "id" ), labelAtomId );
	      assertEquals( combo._field.getInputElement().getAttribute( "aria-labelledby" ), labelAtomId );
	      labelAtom.destroy();
	      combo.destroy();
      });
    },
    
    _createLabel : function( labelText ) {
      var atom = new qx.ui.basic.Atom();
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      wm.add( atom, "w3", true );
      atom.addToDocument();
      org.eclipse.swt.LabelUtil.initialize( atom );
      org.eclipse.swt.LabelUtil.setWrap( atom, false );
      org.eclipse.swt.LabelUtil.setText( atom, labelText );
      return atom;
    }
  }
  
} );