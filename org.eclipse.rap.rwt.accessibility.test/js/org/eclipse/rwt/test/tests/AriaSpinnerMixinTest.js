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

qx.Class.define( "org.eclipse.rwt.test.tests.AriaSpinnerMixinTest", {

  extend : qx.core.Object,
  
  construct : function() {
    this.base( arguments );
  },
  
  members : {
  	testSpinnerIncludesMixin : function() {
      qx.Class.hasOwnMixin( org.eclipse.swt.widgets.Spinner, org.eclipse.rwt.accessibility.AriaSpinnerMixin );
    },
    
    /////////////////
    // test aria role
    testSpinnerHasAriaSpinbuttonRole : function() {
    	var spinner = new org.eclipse.swt.widgets.Spinner();
    	spinner.addToDocument();
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      assertEquals( spinner._textfield.getInputElement().getAttribute( "role" ), "spinbutton" );
      spinner.destroy();
    },
    
    ///////////////////////
    // test aria properties
    testAriaValuenow : function() {
    	var spinner = new org.eclipse.swt.widgets.Spinner();
      spinner.addToDocument();
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var inputElement = spinner._textfield.getInputElement();
      assertEquals( spinner._textfield.getValue(), inputElement.getAttribute( "aria-valuenow" ) );
      spinner.setValue( 25 );
      assertEquals( spinner._textfield.getValue(), inputElement.getAttribute( "aria-valuenow" ) );
      spinner.destroy();
    },
    
    testAriaValuemin : function() {
    	var spinner = new org.eclipse.swt.widgets.Spinner();
      spinner.addToDocument();
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var inputElement = spinner._textfield.getInputElement();
      assertEquals( inputElement.getAttribute( "aria-valuemin" ), spinner.getMin() );
      spinner.setMin( 20 );
      assertEquals( inputElement.getAttribute( "aria-valuemin" ), spinner.getMin() );
      spinner.destroy();
    },
    
    testAriaValuemax : function() {
    	var spinner = new org.eclipse.swt.widgets.Spinner();
      spinner.addToDocument();
      var testUtil =  org.eclipse.rwt.test.fixture.TestUtil;
      testUtil.flush();
      var inputElement = spinner._textfield.getInputElement();
      assertEquals( inputElement.getAttribute( "aria-valuemax" ), spinner.getMax() );
      spinner.setMax( 700 );
      assertEquals( inputElement.getAttribute( "aria-valuemax" ), spinner.getMax() );
      spinner.destroy();
    },
    
    //////////////////
    // test aria label

    testAriaLabelledBy : function() {
      var spinner = new org.eclipse.swt.widgets.Spinner();
      spinner.addToDocument();
      var labelAtom = this._createLabel( "blub" );
      var testUtil = org.eclipse.rwt.test.fixture.TestUtil;
      spinner.setLabelledBy( labelAtom );
      testUtil.flush();
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var labelAtomId = wm.findIdByWidget( labelAtom ) + "_aria_label";
      assertEquals( labelAtomId, labelAtom.getHtmlAttribute( "id" ) );
      var ariaLabelledby = spinner._textfield.getInputElement().getAttribute( "aria-labelledby" );
      assertEquals( ariaLabelledby, labelAtomId );
      labelAtom.destroy();
      spinner.destroy();
      
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