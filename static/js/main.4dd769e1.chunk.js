(this["webpackJsonpreact-pomodoro"]=this["webpackJsonpreact-pomodoro"]||[]).push([[0],{14:function(e,t,n){},8:function(e,t,n){e.exports=n(9)},9:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n(2),i=n(3),r=n(5),o=n(4),l=n(0),c=n.n(l),u=n(7),h=n.n(u),m=(n(14),function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return c.a.createElement("div",{id:"".concat(this.props.value.toLowerCase(),"-panel"),className:"control-panel"},c.a.createElement("h2",{id:"".concat(this.props.value.toLowerCase(),"-label")},"".concat(this.props.value," Length")),c.a.createElement("button",{id:"".concat(this.props.value.toLowerCase(),"-decrement"),onClick:this.props.handleInDecrement,className:"btn-level"},c.a.createElement("i",{className:"fa fa-arrow-down fa-2x","aria-hidden":"true"})),c.a.createElement("p",{id:"".concat(this.props.value.toLowerCase(),"-length"),className:"btn-level"},this.props.length),c.a.createElement("button",{id:"".concat(this.props.value.toLowerCase(),"-increment"),onClick:this.props.handleInDecrement,className:"btn-level"},c.a.createElement("i",{className:"fa fa-arrow-up fa-2x","aria-hidden":"true"})))}}]),n}(c.a.Component));function d(e){return c.a.createElement("div",{id:"display-panel"},c.a.createElement("h2",{id:"timer-label"},e.currentCounting),c.a.createElement("p",{id:"time-left"},e.timeLeft),c.a.createElement("div",null,c.a.createElement("button",{id:"start_stop",onClick:e.handleStartToggle,className:"btn-level"},c.a.createElement("i",{className:"fa fa-play fa-3x"}),c.a.createElement("i",{className:"fa fa-pause fa-3x"})),c.a.createElement("button",{id:"reset",onClick:e.handleReset,className:"btn-level"},c.a.createElement("i",{className:"fa fa-refresh fa-3x"}))))}var f=function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(e){var i;return Object(s.a)(this,n),(i=t.call(this,e)).state={breakLength:5,sessionLength:25,timeLeft:1500,counting:!1,currentCounting:"Session"},i.handleReset=i.handleReset.bind(Object(a.a)(i)),i.clockify=i.clockify.bind(Object(a.a)(i)),i.handleStartToggle=i.handleStartToggle.bind(Object(a.a)(i)),i.tick=i.tick.bind(Object(a.a)(i)),i.handleInDecrement=i.handleInDecrement.bind(Object(a.a)(i)),i}return Object(i.a)(n,[{key:"handleReset",value:function(){this.setState({breakLength:5,sessionLength:25,timeLeft:1500,counting:!1,currentCounting:"Session"}),clearInterval(this.intervalID);var e=document.getElementById("beep");e.pause(),e.currentTime=0,document.getElementById("time-left").style.color=null,document.getElementsByTagName("title")[0].text="Promodoro Clock"}},{key:"handleInDecrement",value:function(e){if(!this.state.counting)switch(e.currentTarget.id){case"break-decrement":return this.state.breakLength>1?void this.setState((function(e){return{breakLength:e.breakLength-1}})):void 0;case"break-increment":return this.state.breakLength<60?void this.setState((function(e){return{breakLength:e.breakLength+1}})):void 0;case"session-decrement":return this.state.sessionLength>1?void this.setState((function(e){return{sessionLength:e.sessionLength-1,timeLeft:e.timeLeft-60}})):void 0;case"session-increment":return this.state.sessionLength<60?void this.setState((function(e){return{sessionLength:e.sessionLength+1,timeLeft:e.timeLeft+60}})):void 0;default:return}}},{key:"tick",value:function(){var e=this;if(this.state.timeLeft<=60?document.getElementById("time-left").style.color="rgb(175, 81, 78)":document.getElementById("time-left").style.color=null,this.state.timeLeft<=0){clearInterval(this.intervalID),document.getElementById("beep").play();var t="Session"===this.state.currentCounting?"Break":"Session",n="Session"===this.state.currentCounting?60*this.state.breakLength:60*this.state.sessionLength;return document.getElementById("time-left").style.color=null,this.setState({timeLeft:n,currentCounting:t}),void(this.intervalID=setInterval((function(){e.tick()}),1e3))}this.setState({timeLeft:this.state.timeLeft-1}),document.getElementsByTagName("title")[0].text="(".concat(this.clockify(this.state.timeLeft),") Promodoro Clock")}},{key:"handleStartToggle",value:function(){var e=this;this.state.counting?clearInterval(this.intervalID):this.intervalID=setInterval((function(){e.tick()}),1e3),this.setState((function(t){return{counting:!e.state.counting}}))}},{key:"clockify",value:function(e){var t=Math.floor(e/60),n=e-60*t;return(t=t<10?"0"+t:t)+":"+(n=n<10?"0"+n:n)}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("h1",null,"Promodoro Clock"),c.a.createElement(d,{timeLeft:this.clockify(this.state.timeLeft),handleReset:this.handleReset,handleStartToggle:this.handleStartToggle,currentCounting:this.state.currentCounting}),c.a.createElement("div",{id:"control-panels-group"},c.a.createElement(m,{value:"Break",length:this.state.breakLength,handleInDecrement:this.handleInDecrement}),c.a.createElement(m,{value:"Session",length:this.state.sessionLength,handleInDecrement:this.handleInDecrement})),c.a.createElement("audio",{id:"beep",preload:"auto",src:"https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"}))}}]),n}(c.a.Component);h.a.render(c.a.createElement(f,null),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.4dd769e1.chunk.js.map