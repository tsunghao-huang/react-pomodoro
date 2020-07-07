(this["webpackJsonpreact-pomodoro"]=this["webpackJsonpreact-pomodoro"]||[]).push([[0],{14:function(e,t,n){},8:function(e,t,n){e.exports=n(9)},9:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n(2),i=n(3),r=n(5),o=n(4),l=n(0),c=n.n(l),h=n(7),u=n.n(h),d=(n(14),{Session:"\u5de5\u4f5c",Break:"\u4f11\u606f"}),m=function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return c.a.createElement("div",{id:"".concat(this.props.value.toLowerCase(),"-panel"),className:"control-panel"},c.a.createElement("button",{id:"default-".concat(this.props.value.toLowerCase()),onClick:this.props.handleDefaultBtn},this.props.english?this.props.value:d[this.props.value]),c.a.createElement("h2",{id:"".concat(this.props.value.toLowerCase(),"-label")},this.props.english?"Custom ".concat(this.props.value):"\u81ea\u8a02".concat(d[this.props.value])),c.a.createElement("button",{id:"".concat(this.props.value.toLowerCase(),"-decrement"),onClick:this.props.handleInDecrement,className:"btn-level"},c.a.createElement("i",{className:"fa fa-arrow-down fa-2x","aria-hidden":"true"})),c.a.createElement("p",{id:"".concat(this.props.value.toLowerCase(),"-length"),className:"btn-level"},this.props.length),c.a.createElement("button",{id:"".concat(this.props.value.toLowerCase(),"-increment"),onClick:this.props.handleInDecrement,className:"btn-level"},c.a.createElement("i",{className:"fa fa-arrow-up fa-2x","aria-hidden":"true"})))}}]),n}(c.a.Component);function g(e){return c.a.createElement("div",{id:"display-panel"},c.a.createElement("h2",{id:"timer-label"},e.english?e.currentCounting:d[e.currentCounting]),c.a.createElement("p",{id:"time-left"},e.timeLeft),c.a.createElement("div",null,c.a.createElement("button",{id:"start_stop",onClick:e.handleStartToggle,className:"btn-level"},c.a.createElement("i",{className:"fa fa-play fa-3x"}),c.a.createElement("i",{className:"fa fa-pause fa-3x"})),c.a.createElement("button",{id:"reset",onClick:e.handleReset,className:"btn-level"},c.a.createElement("i",{className:"fa fa-refresh fa-3x"}))))}var f=function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(e){var i;return Object(s.a)(this,n),(i=t.call(this,e)).state={breakLength:5,sessionLength:25,timeLeft:1500,counting:!1,currentCounting:"Session",english:!1},i.handleReset=i.handleReset.bind(Object(a.a)(i)),i.clockify=i.clockify.bind(Object(a.a)(i)),i.handleStartToggle=i.handleStartToggle.bind(Object(a.a)(i)),i.tick=i.tick.bind(Object(a.a)(i)),i.handleInDecrement=i.handleInDecrement.bind(Object(a.a)(i)),i.handleDefaultBtn=i.handleDefaultBtn.bind(Object(a.a)(i)),i.handleLanguage=i.handleLanguage.bind(Object(a.a)(i)),i}return Object(i.a)(n,[{key:"handleLanguage",value:function(){this.setState({english:!this.state.english})}},{key:"handleReset",value:function(){this.setState({breakLength:5,sessionLength:25,timeLeft:1500,counting:!1,currentCounting:"Session"}),clearInterval(this.intervalID);var e=document.getElementById("beep");e.pause(),e.currentTime=0,document.getElementById("time-left").style.color=null,document.getElementsByTagName("title")[0].text="Promodoro Clock"}},{key:"handleDefaultBtn",value:function(e){this.state.counting||(e.target.id.includes("session")?this.setState({breakLength:5,sessionLength:25,timeLeft:1500,counting:!1,currentCounting:"Session"}):this.setState({breakLength:5,timeLeft:300,counting:!1,currentCounting:"Break"}))}},{key:"handleInDecrement",value:function(e){if(!this.state.counting)switch("".concat(e.currentTarget.id,",current:").concat(this.state.currentCounting)){case"break-decrement,current:Session":return this.state.breakLength>1?void this.setState((function(e){return{breakLength:e.breakLength-1}})):void 0;case"break-increment,current:Session":return this.state.breakLength<60?void this.setState((function(e){return{breakLength:e.breakLength+1}})):void 0;case"break-decrement,current:Break":return this.state.breakLength>1?void this.setState((function(e){return{breakLength:e.breakLength-1,timeLeft:e.timeLeft-60}})):void 0;case"break-increment,current:Break":return this.state.breakLength<60?void this.setState((function(e){return{breakLength:e.breakLength+1,timeLeft:e.timeLeft+60}})):void 0;case"session-decrement,current:Session":return this.state.sessionLength>1?void this.setState((function(e){return{sessionLength:e.sessionLength-1,timeLeft:e.timeLeft-60}})):void 0;case"session-increment,current:Session":return this.state.sessionLength<60?void this.setState((function(e){return{sessionLength:e.sessionLength+1,timeLeft:e.timeLeft+60}})):void 0;case"session-decrement,current:Break":return this.state.sessionLength>1?void this.setState((function(e){return{sessionLength:e.sessionLength-1}})):void 0;case"session-increment,current:Break":return this.state.sessionLength<60?void this.setState((function(e){return{sessionLength:e.sessionLength+1}})):void 0;default:return}}},{key:"tick",value:function(){var e=this;if(this.state.timeLeft<=60?document.getElementById("time-left").style.color="rgb(175, 81, 78)":document.getElementById("time-left").style.color=null,this.state.timeLeft<=0){clearInterval(this.intervalID),document.getElementById("beep").play();var t="Session"===this.state.currentCounting?"Break":"Session",n="Session"===this.state.currentCounting?60*this.state.breakLength:60*this.state.sessionLength;return document.getElementById("time-left").style.color=null,this.setState({timeLeft:n,currentCounting:t}),void(this.intervalID=setInterval((function(){e.tick()}),1e3))}this.setState({timeLeft:this.state.timeLeft-1}),document.getElementsByTagName("title")[0].text="(".concat(this.clockify(this.state.timeLeft),") Promodoro Clock")}},{key:"handleStartToggle",value:function(){var e=this;this.state.counting?clearInterval(this.intervalID):this.intervalID=setInterval((function(){e.tick()}),1e3),this.setState((function(t){return{counting:!e.state.counting}}))}},{key:"clockify",value:function(e){var t=Math.floor(e/60),n=e-60*t;return(t=t<10?"0"+t:t)+":"+(n=n<10?"0"+n:n)}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("h1",null,this.state.english?"Promodoro Clock":"\u8543 \u8304 \u9418"),c.a.createElement("button",{id:"language-btn",onClick:this.handleLanguage},this.state.english?"\u7e41\u9ad4\u4e2d\u6587":"English"),c.a.createElement(g,{timeLeft:this.clockify(this.state.timeLeft),handleReset:this.handleReset,handleStartToggle:this.handleStartToggle,currentCounting:this.state.currentCounting,english:this.state.english}),c.a.createElement("div",{id:"control-panels-group"},c.a.createElement(m,{value:"Break",length:this.state.breakLength,handleInDecrement:this.handleInDecrement,handleDefaultBtn:this.handleDefaultBtn,english:this.state.english}),c.a.createElement(m,{value:"Session",length:this.state.sessionLength,handleInDecrement:this.handleInDecrement,handleDefaultBtn:this.handleDefaultBtn,english:this.state.english})),c.a.createElement("audio",{id:"beep",preload:"auto",src:"https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"}))}}]),n}(c.a.Component);u.a.render(c.a.createElement(f,null),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.1227708a.chunk.js.map