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

qx.Class.define( "org.eclipse.rwt.test.tests.AriaScaleMixinTest", {

  extend : qx.core.Object,
  
  construct : function() {
    this.base( arguments );
  },
  
  members : {
  	testScaleIncludesMixin : function() {
      qx.Class.hasOwnMixin( org.eclipse.swt.widgets.Scale, org.eclipse.rwt.accessibility.AriaScaleMixin );
    },
    
    /////////////////
    // test aria role
    testScaleHasAriaSliderRole : function() {
    	var scale = new org.eclipse.swt.widgets.Scale( "horizontal" );
    	scale.addToDocument();
    	var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
    	testUtil.flush();
    	assertEquals( scale.getHtmlAttribute( "role" ), "slider" );
    	scale.destroy();
    },
    
    ///////////////////////
    // test aria properties
    testAriaValuenow : function() {
    	var scale = new org.eclipse.swt.widgets.Scale( "horizontal" );
      scale.addToDocument();
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertIdentical( scale.getHtmlAttribute( "aria-valuenow" ), scale._selection.toString() );
      scale.setSelection( 10 );
      assertIdentical( scale.getHtmlAttribute( "aria-valuenow" ), scale._selection.toString() );
      scale.destroy();
    },
    
    testAriaValuemin : function() {
      var scale = new org.eclipse.swt.widgets.Scale( "horizontal" );
      scale.addToDocument();
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertIdentical( scale.getHtmlAttribute( "aria-valuemin" ), scale._minimum.toString() );
      scale.setMinimum( 20 );
      assertIdentical( scale.getHtmlAttribute( "aria-valuemin" ), scale._minimum.toString() );
      scale.destroy();
    },
    
     testAriaValuemax : function() {
      var scale = new org.eclipse.swt.widgets.Scale( "horizontal" );
      scale.addToDocument();
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertIdentical( scale.getHtmlAttribute( "aria-valuemax" ), scale._maximum.toString() );
      scale.setMaximum( 397 );
      assertIdentical( scale.getHtmlAttribute( "aria-valuemax" ), scale._maximum.toString() );
      scale.destroy();
    },
    
    testAriaOrientation : function() {
      var scale = new org.eclipse.swt.widgets.Scale( "horizontal" );
      scale.addToDocument();
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( scale.getHtmlAttribute( "aria-orientation" ), "horizontal" );
      scale.destroy();
      scale = new org.eclipse.swt.widgets.Scale( "vertical" );
      scale.addToDocument();
      testUtil.flush();
      assertEquals( scale.getHtmlAttribute( "aria-orientation" ), "vertical" );
      scale.destroy();
    },
    
    ////////////////
    // test refocus 
    
    // NOTE: refocusing an element is neccessary for ORCA reader to recognize DOM changes
    testRefocusOnMouseDown : function() {
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
    	var scale = new org.eclipse.swt.widgets.Scale( "horizontal" );
      scale.addToDocument();
      testUtil.flush();
      scale.focus();
      var focusEventLog = [];
      var focusEventLogger = function( event ) {
        focusEventLog.push( event.getType() );
      };
      scale.addEventListener( "focus", focusEventLogger );
      scale.addEventListener( "blur", focusEventLogger );
      testUtil.click( scale._line );    
      console.log( focusEventLog );
      assertEquals( [ "blur", "focus" ], focusEventLog );
      scale.destroy();
    },
    
    //////////////////
    // test aria label

    testAriaLabelledBy : function() {
      var scale = new org.eclipse.swt.widgets.Scale( "horizontal" );
      scale.addToDocument();
      var labelAtom = this._createLabel( "blub" );
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      scale.setLabelledBy( labelAtom );
      testUtil.flush();
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var labelAtomId = wm.findIdByWidget( labelAtom ) + "_aria_label";
      assertEquals( labelAtom.getHtmlAttribute( "id" ), labelAtomId );
      assertEquals( scale.getHtmlAttribute( "aria-labelledby" ), labelAtomId );
      labelAtom.destroy();
      scale.destroy();
      
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