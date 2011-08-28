/*******************************************************************************
 * Copyright (c) 2011 EclipseSource and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   EclipseSource - initial API and implementation
 ******************************************************************************/
qx.Mixin.define( "org.eclipse.rwt.accessibility.AriaScaleMixin", {
  
  construct : function( style ) {
  	this.setHtmlAttribute( "role", "slider" );
  	this.setHtmlAttribute( "aria-valuenow", this._selection.toString() );
  	this.setHtmlAttribute( "aria-valuemin", this._minimum.toString() );
  	this.setHtmlAttribute( "aria-valuemax", this._maximum.toString() );
  	if( qx.lang.String.contains( style, "horizontal" ) ) {
  		this.setHtmlAttribute( "aria-orientation", "horizontal" );
  	}
  	else if( qx.lang.String.contains( style, "vertical" ) ) {
  		this.setHtmlAttribute( "aria-orientation", "vertical" );
  	}
  },

  members : {
  	
  	setLabelledBy : function( labelWidget ) {
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var labelWidgetId = wm.findIdByWidget( labelWidget ) + "_aria_label";
      labelWidget.setHtmlAttribute( "id", labelWidgetId );
      this.setHtmlAttribute( "aria-labelledby", labelWidgetId );
    },
	
  	setSelection: function( value ) {
  		this.base( arguments, value );
  		this.setHtmlAttribute( "aria-valuenow", value.toString() );
  	},
	
  	setMinimum : function( value ) {
  		this.base( arguments, value );
  		this.setHtmlAttribute( "aria-valuemin", value.toString() );
  	},
 	
  	setMaximum : function( value ) {
      this.base( arguments, value );
      this.setHtmlAttribute( "aria-valuemax", value.toString() );
    },
    
    _onLineMouseDown : function( event ) {
    	this.base( arguments, event );
    	this._updateFocus();
    },
    
    _onThumbMouseDown : function( event ) {
    	this.base( arguments, event );
    	this._updateFocus();
    },
    
    //re-focus element to reliably make ORCA screen reader recognize DOM changes
    _updateFocus : function() {
//      this.blur();
//      this.focus();
    }
  }
  
});

// TODO [tb] : Fix this in Class.js
qx.Class.__initializeClass( org.eclipse.swt.widgets.Scale );

qx.Class.patch( org.eclipse.swt.widgets.Scale, org.eclipse.rwt.accessibility.AriaScaleMixin );