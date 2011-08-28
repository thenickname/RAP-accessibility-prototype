package org.eclipse.rap.rwt.accessibility;

import org.eclipse.rwt.internal.widgets.JSExecutor;
import org.eclipse.rwt.lifecycle.IEntryPoint;
import org.eclipse.rwt.lifecycle.WidgetUtil;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Scale;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Spinner;
import org.eclipse.swt.widgets.Widget;


@SuppressWarnings("restriction")
public class Demo implements IEntryPoint {

  public int createUI() {
    
    Display display = new Display();
    Shell shell = new Shell();
    GridLayout gl = new GridLayout();
    shell.setLayout( gl );
    
    Label label = new Label( shell, SWT.NONE );
    label.setText( "foo" );
    Button button = new Button( shell, SWT.NONE );
    button.setText( "foo" );
    setLabelledBy( button, label );
    
    Label label3 = new Label( shell, SWT.NONE );
    label3.setText( "Wähle zwischen den drei Optionen" );
    Combo combo = new Combo( shell, SWT.READ_ONLY);
    String[] items = { "Käse", "Wurst", "Nutella" };
    combo.setItems( items );
    setLabelledBy( combo, label3 );
    
    Label label4 = new Label( shell, SWT.NONE );
    label4.setText( "Hallo" );
    Scale scale = new Scale( shell, SWT.VERTICAL );
    scale.setMinimum( 0 );
    scale.setMaximum( 20 );
    setLabelledBy( scale, label4 );
    
    Label label6 = new Label( shell, SWT.NONE );
    label6.setText( "Dein Alter" );
    Scale scale2 = new Scale( shell, SWT.HORIZONTAL );
    scale2.setMaximum( 20 );
    scale2.setMinimum( 60 );
    setLabelledBy( scale2, label6 );
    
    Label label5 = new Label( shell, SWT.NONE );
    label5.setText( "Wie groß bist du?");
    Spinner spinner = new Spinner( shell, SWT.NONE );
    spinner.setMinimum( 10 );
    spinner.setMaximum( 55 );
    setLabelledBy( spinner, label5 );
    
    Button toggleButton = new Button( shell, SWT.TOGGLE );
    toggleButton.setText( "cool" );
    Button checkbox = new Button( shell, SWT.CHECK );
    checkbox.setText( "bar" );
    
    Group radioGroup = new Group( shell, SWT.NONE );
    radioGroup.setLayout( new GridLayout() );
    Button radio1 = new Button( radioGroup, SWT.RADIO );
    radio1.setText( "foo" );
    Button radio2 = new Button( radioGroup, SWT.RADIO );
    radio2.setText( "grün" );
    Button radio3 = new Button( radioGroup, SWT.RADIO );
    radio3.setText( "gelb" );
    
    shell.pack();
    shell.open();
      

    while( !shell.isDisposed() ) {
      if( !display.readAndDispatch() ) {
        display.sleep();
      }
    }
    display.dispose();
    return 0;
  }
  
  // NOTE : temporary hack replacing SWT accessibility API
  private static void setLabelledBy( Widget target, Label label ) {
    String code =   getWidgetRef( target ) 
                  + ".setLabelledBy( "
                  + getWidgetRef( label )
                  + " );";
    JSExecutor.executeJS( code );
  }
  
  private static String getWidgetRef( Widget widget ) {
    String widgetId = WidgetUtil.getId( widget );
    return "org.eclipse.swt.WidgetManager.getInstance().findWidgetById( \"" + widgetId + "\" )";
  }
  
}
