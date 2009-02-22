var combinators = ' ,>,+,~'.split(',');
var tags = 'a,abbr,acronym,address,applet,area,b,base,basefont,bdo,big,blockquote,br,button,caption,center,cite,code,col,colgroup,dd,del,dfn,dir,div,dl,dt,em,fieldset,font,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,i,iframe,img,input,ins,isindex,kbd,label,legend,li,link,map,menu,meta,noframes,noscript,object,ol,optgroup,option,p,param,pre,q,s,samp,script,select,small,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th,thead,title,tr,tt,u,ul,var'.split(',');


describe('SubtleSlickParse', {
	
	'should exist': function(){
		value_of( SubtleSlickParse ).should_not_be_undefined();
	},
	
	'should parse multiple selectors': function(){
		var s = SubtleSlickParse('a, b, c');
		value_of( s[0][0].tag ).should_be( 'a' );
		value_of( s[1][0].tag ).should_be( 'b' );
		value_of( s[2][0].tag ).should_be( 'c' );
	},
	
	'should parse multiple selectors with class': function(){
		var s = SubtleSlickParse('a.class, b.class, c.class');
		value_of( s[0][0].tag ).should_be( 'a' );
		value_of( s[1][0].tag ).should_be( 'b' );
		value_of( s[2][0].tag ).should_be( 'c' );
		value_of( s[0][0].classes[0] ).should_be( 'class' );
		value_of( s[1][0].classes[0] ).should_be( 'class' );
		value_of( s[2][0].classes[0] ).should_be( 'class' );
	},
	
	'should parse tag names': function(){
		for (var i=0; i < tags.length; i++) {var tag = tags[i];
			value_of( SubtleSlickParse(tag)[0][0].tag ).should_be( tag );
		}
	},
	
	'should parse tag names with combinators': function(){
		for (var i=0; i < tags.length; i++) {var tag = tags[i];
			for (var C=0; C < combinators.length; C++) {var combinator = combinators[C];
				
				var s = SubtleSlickParse(tag +combinator+ tag);
				
				value_of( s[0][0].tag ).should_be( tag );
				value_of( s[0][1].tag ).should_be( tag );
				value_of( s[0][1].combinator ).should_be( combinator );
			}
		}
	},
	
	'should transform even to 2n+1 in pseudos nth arguments': function(){
		var nths = [
			{raw:        ":nth-child(even)", name:       "nth-child", argument:"2n+1"},
			{raw:   ":nth-last-child(even)", name:  "nth-last-child", argument:"2n+1"},
			{raw: ":nth-last-of-type(even)", name:"nth-last-of-type", argument:"2n+1"},
			{raw:      ":nth-of-type(even)", name:     "nth-of-type", argument:"2n+1"},
			
			{raw:        ":nth-child(even)", name:'nth-child', argument:"2n+1"},
			{raw:        ":nth-child(2n+1)", name:'nth-child', argument:"2n+1"},
			{raw:           ":nth-child(n)", name:'nth-child', argument:"n"   },
		];
		for (var i=0,s, N; N = nths[i]; i++){
			s = SubtleSlickParse(N.raw);
			value_of( s[0][0].pseudos[0].name ).should_be( N.name );
			value_of( s[0][0].pseudos[0].argument ).should_be( N.argument );
		}
	},
	
	'should transform odd to 2n in pseudo nth arguments': function(){
		var nths = [
			{raw:        ":nth-child(odd)", name:       "nth-child", argument:"2n"},
			{raw:   ":nth-last-child(odd)", name:  "nth-last-child", argument:"2n"},
			{raw: ":nth-last-of-type(odd)", name:"nth-last-of-type", argument:"2n"},
			{raw:      ":nth-of-type(odd)", name:     "nth-of-type", argument:"2n"},
			
			{raw:":nth-child(odd)"  , name:'nth-child', argument:"2n" },
			{raw:":nth-child(2n)"   , name:'nth-child', argument:"2n"  },
			{raw:":nth-child(n)"    , name:'nth-child', argument:"n"   },
		];
		for (var i=0,s, N; N = nths[i]; i++){
			s = SubtleSlickParse(N.raw);
			value_of( s[0][0].pseudos[0].name ).should_be( N.name );
			value_of( s[0][0].pseudos[0].argument ).should_be( N.argument );
		}
	}
	
});


describe('MooTools-Slick', {
	
	'should exist': function(){
		value_of( slick ).should_not_be_undefined();
	}
	
});
