/*******************************************************************************
 * Copyright (c) 2011 EclipseSource and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   EclipseSource - initial API and implementation
 ******************************************************************************/

qx.Mixin.define( "org.eclipse.rwt.accessibility.AriaButtonMixin", {
  
  construct : function( buttonType ) {
  	switch( buttonType ) {
      case "push":
        this._initAriaPushButton();
      break;
      case "toggle":
        this._initAriaToggleButton();
      break;
      case "check":
        this._initAriaCheckButton();
      break;
      case "radio":
        this._initAriaRadioButton();
      break;
    }
  },

  destruct : function() {
  },
  
	events: {
		"stateAdded"      : "qx.event.type.Event",
		"stateRemoved"    : "qx.event.type.Event"
	},

  members : {
  	
  	setLabelledBy : function( labelWidget ) {
  		var wm = org.eclipse.swt.WidgetManager.getInstance();
      var labelWidgetId = wm.findIdByWidget( labelWidget ) + "_aria_label";
      labelWidget.setHtmlAttribute( "id", labelWidgetId );
      this.setHtmlAttribute( "aria-labelledby", labelWidgetId );
  	},
  	
  	addState : function( vState ) {
      this.base( arguments, vState );
      this.createDispatchDataEvent( "stateAdded", vState );
    },
    
    removeState : function( vState ) {
      this.base( arguments, vState );
      this.createDispatchDataEvent( "stateRemoved", vState );
    },
  	
  	_initAriaPushButton : function() {
      this.setHtmlAttribute( "role", "button" );
      this.setHtmlAttribute( "aria-pressed", "false" );
      this.addEventListener( "stateAdded", function( event ) {
      	if( event.getData() === "pressed" ) {
      	  this.setHtmlAttribute( "aria-pressed", "true" );
      	  this._updateFocus();
      	}
      }, this );
      this.addEventListener( "stateRemoved", function( event ) {
      	if( event.getData() === "pressed" ) {
      		this.setHtmlAttribute( "aria-pressed", "false" );
          this._updateFocus();
      	}
      }, this );
  	},
  	
  	_initAriaToggleButton : function() {
  		this.setHtmlAttribute( "role", "button" );
  		this.setHtmlAttribute( "aria-pressed", this._selected.toString() );
  		this.addEventListener( "stateAdded", function( event ) {
        if( event.getData() === "selected" ) {
          this.setHtmlAttribute( "aria-pressed", "true" );
          this._updateFocus();
        }
      }, this );
      this.addEventListener( "stateRemoved", function( event ) {
        if( event.getData() === "selected" ) {
          this.setHtmlAttribute( "aria-pressed", "false" );
          this._updateFocus();
        }
      }, this );
  	},
  	
  	_initAriaCheckButton : function() {
  		this.setHtmlAttribute( "role", "checkbox" );
  		this.setHtmlAttribute( "aria-checked", this._selected.toString() );
  		this.addEventListener( "stateAdded", function( event ) {
        if( event.getData() === "selected" ) {
          this.setHtmlAttribute( "aria-checked", "true" );
          this._updateFocus();
        }
      }, this );
      this.addEventListener( "stateRemoved", function( event ) {
        if( event.getData() === "selected" ) {
          this.setHtmlAttribute( "aria-checked", "false" );
          this._updateFocus();
        }
      }, this );
  		
  	},
  	
  	_initAriaRadioButton : function() {
  		this.setHtmlAttribute( "role", "radio" );
  		this.setHtmlAttribute( "aria-checked", this._selected.toString() );
  		this.addEventListener( "stateAdded", function( event ) {
        if( event.getData() === "selected" ) {
          this.setHtmlAttribute( "aria-checked", "true" );
          this._updateFocus();
        }
      }, this );
      this.addEventListener( "stateRemoved", function( event ) {
        if( event.getData() === "selected" ) {
          this.setHtmlAttribute( "aria-checked", "false" );
          this._updateFocus();
        }
      }, this );
  	},
  	
  	//re-focus current element to reliably inform ORCA about DOM changes
  	_updateFocus : function() {
//  		this.blur();
//  		this.focus();
  	}

  } 
});

// TODO [tb] : Fix this in Class.js
qx.Class.__initializeClass( org.eclipse.rwt.widgets.Button );

qx.Class.patch( org.eclipse.rwt.widgets.Button, org.eclipse.rwt.accessibility.AriaButtonMixin );