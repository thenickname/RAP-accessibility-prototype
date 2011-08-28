package org.eclipse.rap.rwt.accessibility;

import org.eclipse.rwt.resources.IResource;
import org.eclipse.rwt.resources.IResourceManager.RegisterOptions;

public class AriaButtonMixinResource implements IResource {

	public ClassLoader getLoader() {
		return this.getClass().getClassLoader();
	}

	public String getLocation() {
		return "org/eclipse/rap/rwt/accessibility/AriaButtonMixin.js";
	}

	public String getCharset() {
		return "UTF-8";
	}

	public RegisterOptions getOptions() {
		return RegisterOptions.VERSION;
	}

	public boolean isJSLibrary() {
		return true;
	}

	public boolean isExternal() {
		return false;
	}

}
