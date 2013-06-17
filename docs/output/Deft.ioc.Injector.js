Ext.data.JsonP.Deft_ioc_Injector({"html":"<div><pre class=\"hierarchy\"><h4>Alternate names</h4><div class='alternate-class-name'>Deft.Injector</div><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Deft.ioc.Injector</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Deft.ioc.DependencyProvider' rel='Deft.ioc.DependencyProvider' class='docClass'>Deft.ioc.DependencyProvider</a></div><div class='dependency'><a href='#!/api/Deft.log.Logger' rel='Deft.log.Logger' class='docClass'>Deft.log.Logger</a></div><div class='dependency'>Ext.Component</div><h4>Files</h4><div class='dependency'><a href='source/Injector.html#Deft-ioc-Injector' target='_blank'>Injector.js</a></div></pre><div class='doc-contents'><p>A lightweight IoC container for dependency injection.</p>\n\n<h2><u><a href=\"https://github.com/deftjs/DeftJS/wiki/Basic-Application-and-IoC-Configuration\">Basic Configuration</a></u></h2>\n\n<pre><code>// Common configuration, using dependency provider name and class.\n<a href=\"#!/api/Deft.ioc.Injector-method-configure\" rel=\"Deft.ioc.Injector-method-configure\" class=\"docClass\">Deft.Injector.configure</a>({\n  companyStore: \"DeftQuickStart.store.CompanyStore\",\n  companyService: \"DeftQuickStart.store.CompanyService\"\n});\n</code></pre>\n\n<p>In the IoC configuration above, we have created two <strong>dependency providers</strong>, one named <code>companyStore</code> and one named <code>companyService</code>. By default, DeftJS uses lazy instantiation to create singleton instances of the <code>CompanyStore</code> and <code>CompanyService</code> classes. This means that a singleton won't be created until an object in your application specifies one of these dependency providers as an injected dependency.</p>\n\n<h2><u><a href=\"https://github.com/deftjs/DeftJS/wiki/Singleton-vs.-Prototype-Dependency-Providers\">Singleton vs. Prototype Dependency Providers</a></u></h2>\n\n<p>By default, the dependency providers set up with the DeftJS <code>Injector</code> are singletons. This means that only one instance of that dependency will be created, and the same instance will be injected into all objects that request that dependency.</p>\n\n<p>For cases where this is not desired, you can create non-singleton (prototype) dependency providers like this:</p>\n\n<pre><code><a href=\"#!/api/Deft.ioc.Injector-method-configure\" rel=\"Deft.ioc.Injector-method-configure\" class=\"docClass\">Deft.Injector.configure</a>({\n  editHistory: {\n    className: \"MyApp.util.EditHistory\",\n    singleton: false\n  }\n});\n</code></pre>\n\n<h2><u><a href=\"https://github.com/deftjs/DeftJS/wiki/Eager-vs.-Lazy-Instantiation\">Lazy vs. Eager Dependency Creation</a></u></h2>\n\n<p>By default, dependency providers are created <strong>lazily</strong>. This means that the dependency will not be created by DeftJS until another object is created which specifies that dependency as an injection.</p>\n\n<p>In cases where lazy instantiation is not desired, you can set up a dependency provider to be created immediately upon application startup by using the <code>eager</code> configuration:</p>\n\n<pre><code><a href=\"#!/api/Deft.ioc.Injector-method-configure\" rel=\"Deft.ioc.Injector-method-configure\" class=\"docClass\">Deft.Injector.configure</a>({\n  notificationService: {\n    className: \"MyApp.service.NotificationService\",\n    eager: true\n  }\n});\n</code></pre>\n\n<blockquote><p><strong>NOTE: Only singleton dependency providers can be eagerly instantiated.</strong> This means that specifying <code>singleton: false</code> and <code>eager: true</code> for a dependency provider won't work. The reason may be obvious: DeftJS can't do anything with a prototype object that is eagerly created, since by definition each injection of a prototype dependency must be a new instance!</p></blockquote>\n\n<h2><u><a href=\"https://github.com/deftjs/DeftJS/wiki/Constructor-Parameters\">Constructor Parameters</a></u></h2>\n\n<p>If needed, constructor parameters can be specified for a dependency provider. These parameters will be passed into the constructor of the target object when it is created. Constructor parameters can be configured in the following way:</p>\n\n<pre><code><a href=\"#!/api/Deft.ioc.Injector-method-configure\" rel=\"Deft.ioc.Injector-method-configure\" class=\"docClass\">Deft.Injector.configure</a>({\n  contactStore: {\n    className: 'MyApp.store.ContactStore',\n\n    // Specify an array of params to pass into ContactStore constructor\n    parameters: [{\n      proxy: {\n        type: 'ajax',\n        url: '/contacts.json',\n        reader: {\n          type: 'json',\n          root: 'contacts'\n        }\n      }\n    }]\n  }\n});\n</code></pre>\n\n<h2><u><a href=\"https://github.com/deftjs/DeftJS/wiki/Factory-Functions\">Constructor Parameters</a></u></h2>\n\n<p>A dependency provider can also specify a function to use to create the object that will be injected:</p>\n\n<pre><code><a href=\"#!/api/Deft.ioc.Injector-method-configure\" rel=\"Deft.ioc.Injector-method-configure\" class=\"docClass\">Deft.Injector.configure</a>({\n\n  contactStore: {\n    fn: function() {\n      if (useMocks) {\n        return Ext.create(\"MyApp.mock.store.ContactStore\");\n      } else {\n        return Ext.create(\"MyApp.store.ContactStore\");\n      }\n    },\n    eager: true\n  },\n\n  contactManager: {\n    // The factory function will be passed a single argument:\n    // The object instance that the new object will be injected into\n    fn: function(instance) {\n      if (instance.session.getIsAdmin()) {\n        return Ext.create(\"MyApp.manager.admin.ContactManager\");\n      } else {\n        return Ext.create(\"MyApp.manager.user.ContactManager\");\n      }\n    },\n    singleton: false\n  }\n\n});\n</code></pre>\n\n<p>When the Injector is called to resolve dependencies for these identifiers, the factory function is called and the dependency is resolved with the return value.</p>\n\n<p>As shown above, a lazily instantiated factory function can optionally accept a parameter, corresponding to the instance for which the Injector is currently injecting dependencies.</p>\n\n<p>Factory function dependency providers can be configured as singletons or prototypes and can be eagerly or lazily instantiated.</p>\n\n<blockquote><p><strong>NOTE: Only singleton factory functions can be eagerly instantiated.</strong> This means that specifying <code>singleton: false</code> and <code>eager: true</code> for a dependency provider won't work. The reason may be obvious: DeftJS can't do anything with a prototype object that is eagerly created, since by definition each injection of a prototype dependency must be a new instance!</p></blockquote>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.ioc.Injector'>Deft.ioc.Injector</span><br/><a href='source/Injector.html#Deft-ioc-Injector-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Deft.ioc.Injector-method-constructor' class='name expandable'>Deft.ioc.Injector</a>( <span class='pre'></span> ) : <a href=\"#!/api/Deft.ioc.Injector\" rel=\"Deft.ioc.Injector\" class=\"docClass\">Deft.ioc.Injector</a></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Deft.ioc.Injector\" rel=\"Deft.ioc.Injector\" class=\"docClass\">Deft.ioc.Injector</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-canResolve' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.ioc.Injector'>Deft.ioc.Injector</span><br/><a href='source/Injector.html#Deft-ioc-Injector-method-canResolve' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.ioc.Injector-method-canResolve' class='name expandable'>canResolve</a>( <span class='pre'>identifier</span> )</div><div class='description'><div class='short'>Indicates whether the Injector can resolve a dependency by the specified identifier with the corresponding object ins...</div><div class='long'><p>Indicates whether the Injector can resolve a dependency by the specified identifier with the corresponding object instance or value.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>identifier</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-configure' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.ioc.Injector'>Deft.ioc.Injector</span><br/><a href='source/Injector.html#Deft-ioc-Injector-method-configure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.ioc.Injector-method-configure' class='name expandable'>configure</a>( <span class='pre'>configuration</span> )</div><div class='description'><div class='short'>Configure the Injector. ...</div><div class='long'><p>Configure the Injector.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>configuration</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-inject' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.ioc.Injector'>Deft.ioc.Injector</span><br/><a href='source/Injector.html#Deft-ioc-Injector-method-inject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.ioc.Injector-method-inject' class='name expandable'>inject</a>( <span class='pre'>identifiers, targetInstance, targetInstanceConstructorArguments, targetInstanceIsInitialized</span> )</div><div class='description'><div class='short'>Inject dependencies (by their identifiers) into the target object instance. ...</div><div class='long'><p>Inject dependencies (by their identifiers) into the target object instance.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>identifiers</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>targetInstance</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>targetInstanceConstructorArguments</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>targetInstanceIsInitialized</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-reset' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.ioc.Injector'>Deft.ioc.Injector</span><br/><a href='source/Injector.html#Deft-ioc-Injector-method-reset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.ioc.Injector-method-reset' class='name expandable'>reset</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Reset the Injector. ...</div><div class='long'><p>Reset the Injector.</p>\n</div></div></div><div id='method-resolve' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.ioc.Injector'>Deft.ioc.Injector</span><br/><a href='source/Injector.html#Deft-ioc-Injector-method-resolve' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.ioc.Injector-method-resolve' class='name expandable'>resolve</a>( <span class='pre'>identifier, targetInstance, targetInstanceConstructorArguments</span> )</div><div class='description'><div class='short'>Resolve a dependency (by identifier) with the corresponding object instance or value. ...</div><div class='long'><p>Resolve a dependency (by identifier) with the corresponding object instance or value.</p>\n\n<p>Optionally, the caller may specify the target instance (to be supplied to the dependency provider's factory function, if applicable).</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>identifier</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>targetInstance</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>targetInstanceConstructorArguments</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","requires":["Deft.ioc.DependencyProvider","Deft.log.Logger","Ext.Component"],"parentMixins":[],"extends":"Ext.Base","enum":null,"meta":{},"inheritable":null,"tagname":"class","singleton":true,"html_meta":{},"subclasses":[],"mixins":[],"statics":{"cfg":[],"css_mixin":[],"property":[],"method":[],"event":[],"css_var":[]},"members":{"cfg":[],"css_mixin":[],"property":[],"method":[{"meta":{},"owner":"Deft.ioc.Injector","tagname":"method","name":"constructor","id":"method-constructor"},{"meta":{},"owner":"Deft.ioc.Injector","tagname":"method","name":"canResolve","id":"method-canResolve"},{"meta":{},"owner":"Deft.ioc.Injector","tagname":"method","name":"configure","id":"method-configure"},{"meta":{},"owner":"Deft.ioc.Injector","tagname":"method","name":"inject","id":"method-inject"},{"meta":{},"owner":"Deft.ioc.Injector","tagname":"method","name":"reset","id":"method-reset"},{"meta":{},"owner":"Deft.ioc.Injector","tagname":"method","name":"resolve","id":"method-resolve"}],"event":[],"css_var":[]},"aliases":{},"alternateClassNames":["Deft.Injector"],"override":null,"private":null,"component":false,"linenr":7,"name":"Deft.ioc.Injector","superclasses":["Ext.Base"],"id":"class-Deft.ioc.Injector","uses":[],"mixedInto":[],"files":[{"href":"Injector.html#Deft-ioc-Injector","filename":"Injector.js"}],"code_type":"ext_define","inheritdoc":null});