/*******************************************************************************
 * Copyright (c) 2011 EclipseSource and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   EclipseSource - initial API and implementation
 ******************************************************************************/

globButtons = [];

qx.Mixin.define( "org.eclipse.rwt.accessibility.AriaButtonMixin", {
  
  construct : function( buttonType ) {
  	globButtons.push( this );
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
  		  this._initAriaRadioButton()
  		break;
  	}
  },

  destruct : function() {
  },

  members : {
  	
//  	_focusIndicator : org.eclipse.rwt.FocusIndicator.getInstance(),
  	
    addState : function( vState ) {
    	this.base( arguments, vState );
    	this._ariaAddStateAction( vState );
//    	if( vState == "focused" && qx.event.handler.FocusHandler.mouseFocus ) {
//          try {
//          this.getElement().focus();
//        } catch(ex) {}
//      }
    },
    
    _ariaAddStateAction : function() {
    },

		removeState : function( vState ) {
			this.base( arguments, vState );
			this._ariaRemoveStateAction( vState );
		},
		
    _ariaRemoveStateAction : function() {
    },
    
    _onFocus : function( event ) {
    	console.log( "_onFocus: document.activeElement", document.activeElement );
    	this.base( arguments, event );
    	this._ariaOnFocusAction();
    },
    
    _ariaOnFocusAction : function() {
    },

    _onBlur : function( event ) {
    	this.base( arguments, event );
      this._ariaOnBlurAction();
    },
    
    _ariaOnBlurAction : function() {
    },
   
    _setAriaPressed : function( ariaState ) {
    	this.setHtmlAttribute( "aria-pressed", ariaState );
    },
    
    _setAriaChecked : function( ariaState ) {
    	this.setHtmlAttribute( "aria-checked", ariaState );
    },
    
    _initAriaPushButton : function() {
    	
    	this.setHtmlAttribute( "role", "button" );
      this.setHtmlAttribute( "aria-pressed", "false" );
      
      
      this._ariaAddStateAction = function( vState ) {
        if( vState == "pressed" ) {
          this._setAriaPressed( "true" );
          try {
	          this.getElement().blur();
	          this.getElement().focus();
	        } catch(ex) {}
        }
      };
      
      this._ariaRemoveStateAction = function( vState ) {
        if( vState == "pressed" ) {
          this._setAriaPressed( "false" );
          this.getElement().blur();
          this.getElement().focus();
        }
      };
      
      this._ariaOnFocusAction = function() {
//        this._focusIndicator._frame.setAttribute( "role" , "button" );
      };
      
    },
    
    _initAriaToggleButton : function() {
    	
    	this.setHtmlAttribute( "role", "button" );
      this.setHtmlAttribute( "aria-pressed", this._selected );
      
      this._ariaAddStateAction = function( vState ) {
        if( vState == "selected" ) {
          this._setAriaPressed( true );
          try {
            this.getElement().blur();
            this.getElement().focus();
          } catch(ex) {}
        }
      };
      
      this._ariaRemoveStateAction = function( vState ) {
        if( vState == "selected" ) {
          this._setAriaPressed( false );
          this.getElement().blur();
          this.getElement().focus();
        }
      };
            
      this._ariaOnFocusAction = function() {
//        this._focusIndicator._frame.setAttribute( "role" , "button" );
      };
      
    },
    
    _initAriaCheckButton : function() {
    	
    	this.setHtmlAttribute( "role", "checkbox" );
      this.setHtmlAttribute( "aria-checked", this._selected );
      
      this._ariaAddStateAction = function( vState ) {
      	if( vState === "selected") {
      		this._setAriaChecked( true );
      		try {
            this.getElement().blur();
            this.getElement().focus();
          } catch(ex) {}
			 	}
			};
			
			this._ariaRemoveStateAction = function( vState ) {
				if( vState === "selected") {
					this._setAriaChecked( false );
					this.getElement().blur();
          this.getElement().focus();
	      }
	    };
      
      this._ariaOnFocusAction = function() {
//        this._focusIndicator._frame.setAttribute( "role" , "checkbox" );
      };
      
    },
    
    _initAriaRadioButton : function() {
    	
    	this.setHtmlAttribute( "role", "radio" );
      this.setHtmlAttribute( "aria-checked", this._selected );
      
      this._ariaAddStateAction = function( vState ) {
      	if( vState === "selected") {
      		this._setAriaChecked( true );
      		try {
            this.getElement().blur();
            this.getElement().focus();
          } catch(ex) {}
      	}
      };
      
      this._ariaRemoveStateAction = function( vState ) {
      	if( vState === "selected") {
      		this._setAriaChecked( false );
      		this.getElement().blur();
          this.getElement().focus();
      	}
      };
      
      this._ariaOnFocusAction = function() {
//      	this._focusIndicator._frame.setAttribute( "role" , "radio" );
      };
    }
    
  } 
});

// TODO [tb] : Fix this in Class.js
qx.Class.__initializeClass( org.eclipse.rwt.widgets.Button );

qx.Class.patch( org.eclipse.rwt.widgets.Button, org.eclipse.rwt.accessibility.AriaButtonMixin );