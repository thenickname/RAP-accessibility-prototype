/*******************************************************************************
 * Copyright (c) 2011 EclipseSource and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   EclipseSource - initial API and implementation
 ******************************************************************************/
qx.Mixin.define( "org.eclipse.rwt.accessibility.AriaComboMixin", {
	
	// NOTE : Tested successfully with JAWS 13 in Firefox 4 on Windows 7 (32bit)
	//        Gnome's ORCA screen reader on Ubuntu 10.10 fails to read the combo box correctly
  
  construct : function( style ) {
  },

  destruct : function() {
  },
  
  events: {
  },

  members : {
  	
  	_labelledby : null,
  	
  	setLabelledBy : function( labelWidget ) {
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var labelWidgetId = wm.findIdByWidget( labelWidget ) + "_aria_label";
      labelWidget.setHtmlAttribute( "id", labelWidgetId );
      this._labelledby = labelWidgetId;
    },
  	  	
  	_onAppear : function( evt ) {
  		this.base( arguments, evt );
  		this._field.getInputElement().setAttribute( "role", "combobox" );
  		this._field.getInputElement().setAttribute( "aria-autocomplete", "list" );
  		this._list.setHtmlAttribute( "role", "listbox" );
  		var wm = org.eclipse.swt.WidgetManager.getInstance();
  	  var widgetId = wm.findIdByWidget( this );
      var listId = widgetId + "_aria_listbox";
      this._list.setHtmlAttribute( "id", listId );
      this._field.getInputElement().setAttribute( "aria-owns", listId );
      if( this._labelledby !== null ) {
      	 this._field.getInputElement().setAttribute( "aria-labelledby", this._labelledby );
      }
  	},
  	
  	setItems : function( items ) {
      this.base( arguments, items );
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      var widgetId = wm.findIdByWidget( this );
      var listItems = this._list.getItems();
      for( var i = 0; i < listItems.length; i++ ) {
        listItems[ i ].setHtmlAttribute( "role", "option" );
        var listItemId = widgetId + "_aria_option_" + i
        listItems[ i ].setHtmlAttribute( "id", listItemId );
      }
    },
    
  	_setSelected : function( value ) {
  		this.base( arguments, value );
  		var wm = org.eclipse.swt.WidgetManager.getInstance();
  		var widgetId = wm.findIdByWidget( this );
  		var listItemId = value.getHtmlAttribute( "id" );
  		var inputElement = this._field.getInputElement();
  		if( inputElement !== null ) {
  			inputElement.setAttribute( "aria-activedescendant", listItemId );
  		}
  	}
  	
  }
  
} );

// TODO [tb] : Fix this in Class.js
qx.Class.__initializeClass( org.eclipse.swt.widgets.Combo );

qx.Class.patch( org.eclipse.swt.widgets.Combo, org.eclipse.rwt.accessibility.AriaComboMixin );