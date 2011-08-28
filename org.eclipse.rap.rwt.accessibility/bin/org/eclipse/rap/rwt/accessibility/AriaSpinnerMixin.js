/*******************************************************************************
 * Copyright (c) 2011 EclipseSource and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   EclipseSource - initial API and implementation
 ******************************************************************************/
qx.Mixin.define( "org.eclipse.rwt.accessibility.AriaSpinnerMixin", {
  
  construct : function() {
    this.addEventListener( "flush", this._onFlush );
  },

  members : {
  	
  	_time : null,
  	
  	_labelledby : null,
  	
  	setLabelledBy : function( labelWidget ) {
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var labelWidgetId = wm.findIdByWidget( labelWidget ) + "_aria_label";
      labelWidget.setHtmlAttribute( "id", labelWidgetId );
      this._labelledby = labelWidgetId;
    },
  	
    _onFlush : function( evt ) {
      if( evt.getData().initial ){
      	var inputElement = this._textfield.getInputElement();
        inputElement.setAttribute( "role", "spinbutton" );
        inputElement.setAttribute( "aria-valuenow", this._textfield.getValue() );
        inputElement.setAttribute( "aria-valuemin", this.getMin() );
        inputElement.setAttribute( "aria-valuemax", this.getMax() );
        if( this._labelledby !== null ) {
          inputElement.setAttribute( "aria-labelledby", this._labelledby );
        }
      }
    },
    
    _onChangeValue : function( evt ) {
      this.base( arguments, evt );
      var inputElement = this._textfield.getInputElement();
      if( inputElement !== null ) {
        inputElement.setAttribute( "aria-valuenow", this._textfield.getValue() );
      }
    },
    
    setMin : function( value ) {
    	this.base( arguments, value );
    	var inputElement = this._textfield.getInputElement();
    	if( inputElement !== null ) {
    		inputElement.setAttribute( "aria-valuemin", value );
    	}
    },
    
    setMax : function( value ) {
    	this.base( arguments, value );
      var inputElement = this._textfield.getInputElement();
      if( inputElement !== null ) {
        inputElement.setAttribute( "aria-valuemax", value );
      }
    },

    // NOTE [tb] : JAWS repeat event fix (incomplete)
    // TODO [tb] : hack EventHandlerUtil to solve this globally?
    _onkeydown : function( event ) {
      var newtime = ( new Date() ).getTime();
      var diff;
      if( this._time !== null ) {
        diff = newtime - this._time;
        console.log( diff );
      }
      if( this._time === null || diff > 100 ) {
        this.base( arguments, event );
      }
      this._time = newtime;
    }
    
  }
  
} );

// TODO [tb] : Fix this in Class.js
qx.Class.__initializeClass( org.eclipse.swt.widgets.Spinner );

qx.Class.patch( org.eclipse.swt.widgets.Spinner, org.eclipse.rwt.accessibility.AriaSpinnerMixin );