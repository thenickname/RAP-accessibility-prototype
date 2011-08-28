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

qx.Class.define( "org.eclipse.rwt.test.tests.AriaButtonMixinTest", {

  extend : qx.core.Object,
  
  construct : function() {
    this.base( arguments );
  },
  
  members : {
  	
    testButtonIncludesMixin : function() {
    	qx.Class.hasOwnMixin( org.eclipse.rwt.widgets.Button, org.eclipse.rwt.accessibility.AriaButtonMixin );
    },
    
    //////////////////
    // test aria roles

    testPushButtonHasAriaButtonRole : function() {
    	var button = new org.eclipse.rwt.widgets.Button( "push" );
      button.addState( "rwt_PUSH" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( "button", button.getHtmlAttribute( "role" ) );
      button.destroy();
    },
    
    testToggleButtonHasAriaButtonRole : function() {
      var button = new org.eclipse.rwt.widgets.Button( "toggle" );
      button.addState( "rwt_TOGGLE" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( button.getHtmlAttribute( "role" ), "button" );
      button.destroy();
    },
    
    testCheckButtonHasAriaCheckboxRole : function() {
      var button = new org.eclipse.rwt.widgets.Button( "check" );
      button.addState( "rwt_CHECK" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( button.getHtmlAttribute( "role" ), "checkbox" );
      button.destroy();
    },
    
    testRadioButtonHasAriaRadioRole : function() {
      var button = new org.eclipse.rwt.widgets.Button( "radio" );
      button.addState( "rwt_RADIO" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( button.getHtmlAttribute( "role" ), "radio" );
      button.destroy();
    },
    
    //////////////////////////
    // test initial aria state
    
    testPushButtonInitialAriaState : function() {
    	var button = new org.eclipse.rwt.widgets.Button( "push" );
    	button.addState( "rwt_PUSH" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( button.getHtmlAttribute( "aria-pressed" ), "false" );
      button.destroy();
    },
    
    testToggleButtonInitialAriaState : function() {
    	var button = new org.eclipse.rwt.widgets.Button( "toggle" );
      button.addState( "rwt_TOGGLE" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( button.getHtmlAttribute( "aria-pressed" ), button._selected.toString() );
      button.destroy();
    },
    
    testCheckButtonInitialAriaState : function() {
    	var button = new org.eclipse.rwt.widgets.Button( "check" );
      button.addState( "rwt_CHECKED" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( button.getHtmlAttribute( "aria-checked" ), button._selected.toString() );
      button.destroy();
    },
    
    testRadioButtonInitialAriaState : function() {
    	var button = new org.eclipse.rwt.widgets.Button( "radio" );
      button.addState( "rwt_RADIO" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( button.getHtmlAttribute( "aria-checked" ), button._selected.toString() );
      button.destroy();
    },
    
		/*
		 * test aria state changes
		 * also check if widget is re-focused to make sure that screen reader recognizes aria state changes:
		 * event order must be "focus", "blur", "focus" after first mousedown (or after first click)
		 */
    testPushButtonAriaPressed : function() {
    	var button = new org.eclipse.rwt.widgets.Button( "push" );
      button.addState( "rwt_PUSH" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var focusEventLog = [];
      var focusEventLogger = function( event ) {
      	focusEventLog.push( event.getType() );
      };
      button.addEventListener( "blur", focusEventLogger );
      button.addEventListener( "focus", focusEventLogger );
      var node = button._getTargetNode();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
    	testUtil.fakeMouseEventDOM( node, "mousedown" );
    	assertEquals( button.getHtmlAttribute( "aria-pressed" ), "true" );
    	assertTrue( this._isCorrectEventOrder( focusEventLog ) );
    	testUtil.fakeMouseEventDOM( node, "mouseup" );
    	assertEquals( button.getHtmlAttribute( "aria-pressed" ), "false" );
    	button.destroy();
    },
    
    testToggleButtonAriaPressed : function() {
    	var button = new org.eclipse.rwt.widgets.Button( "toggle" );
    	button.addState( "rwt_TOGGLE" );
    	button.addToDocument();
    	var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var focusEventLog = [];
      var focusEventLogger = function( event ) {
        focusEventLog.push( event.getType() );
      };
      button.addEventListener( "blur", focusEventLogger );
      button.addEventListener( "focus", focusEventLogger );
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.click( button );
      assertEquals( button.getHtmlAttribute( "aria-pressed" ), button._selected.toString() );
      assertTrue( this._isCorrectEventOrder( focusEventLog ) );
      testUtil.click( button );
      assertEquals( button.getHtmlAttribute( "aria-pressed" ), button._selected.toString() );
      button.destroy();
    },
    
    testCheckButtonAriaChecked : function() {
    	var button = new org.eclipse.rwt.widgets.Button( "check" );
      button.addState( "rwt_CHECK" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var focusEventLog = [];
      var focusEventLogger = function( event ) {
        focusEventLog.push( event.getType() );
      };
      button.addEventListener( "blur", focusEventLogger );
      button.addEventListener( "focus", focusEventLogger );
      testUtil.click( button );
      assertEquals( button.getHtmlAttribute( "aria-checked" ), button._selected.toString() );
      assertTrue( this._isCorrectEventOrder( focusEventLog ) );
      testUtil.click( button );
      assertEquals( button.getHtmlAttribute( "aria-checked" ), button._selected.toString() );
      button.destroy();
    },
    
    testRadioButtonAriaChecked : function() {
      var button = new org.eclipse.rwt.widgets.Button( "radio" );
      button.addState( "rwt_RADIO" );
      button.addToDocument();
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var focusEventLog = [];
      var focusEventLogger = function( event ) {
        focusEventLog.push( event.getType() );
      };
      button.addEventListener( "blur", focusEventLogger );
      button.addEventListener( "focus", focusEventLogger );
      testUtil.click( button );
      assertEquals( button.getHtmlAttribute( "aria-checked" ), button._selected.toString() );
      assertTrue( this._isCorrectEventOrder( focusEventLog ) );
      testUtil.click( button );
      assertEquals( button.getHtmlAttribute( "aria-checked" ), button._selected.toString() );
      button.destroy();
    },
    
    ////////////
    //test aria label
	  testAriaLabelledBy : function() {
	  	var button = new org.eclipse.rwt.widgets.Button( "push" );
      button.addState( "rwt_PUSH" );
      button.addToDocument();
      var labelAtom = this._createLabel( "blub" );
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      button.setLabelledBy( labelAtom );
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var labelAtomId = wm.findIdByWidget( labelAtom ) + "_aria_label";
      assertEquals( labelAtom.getHtmlAttribute( "id" ), labelAtomId );
      labelAtom.destroy();
      assertEquals( button.getHtmlAttribute( "aria-labelledby" ), labelAtomId );
      button.destroy();
      
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
	  },
	  
    _isCorrectEventOrder : function( eventLog ) {
      var result = false;
      if( eventLog.length === 3 ){
        if( eventLog[ 0 ] === "focus" && eventLog [ 1 ] === "blur" && eventLog[ 2 ] === "focus" ){
        	result = true;
        }
      }
      return result;
    }
    
	}
  
} );
