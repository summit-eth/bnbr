(()=>{let cfg={data(){return{current_time:new Date().getTime(),config:{contract:{abi:"",address:""},contracts:{cake:{abi:window.abi_contract_cake,address:"0xB0b02b8c610Cbbacd222ff5BA7103d7D443bf05B"},busd:{abi:window.abi_contract_busd,address:"0xD3981cE564E331C8e34B95246415f3F3e29a0b8B"},bnb:{abi:window.abi_contract_bnb,address:"0x619FA768816F04cAB3317A25ee7B786BC9Cb5074"},},tokens:{cake:{abi:window.abi_token,address:"0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"},busd:{abi:window.abi_token,address:"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"},},price:{url:"https:\/\/api.coingecko.com\/api\/v3\/simple\/price?ids=binancecoin&vs_currencies=usd",url_pcs:"https:\/\/api.coingecko.com\/api\/v3\/simple\/price?ids=pancakeswap-token&vs_currencies=usd",price:0,price_pcs:0,}},launch_date:0,time_left:{hours:0,minutes:0,seconds:0},farms:{bnb:0,busd:0,cake:0,ada:0,flush:0,},loaded:0,test_mode:0,constants:{MIN_INVEST:0,WITHDRAW_COOLDOWN:0,},val:{invest:50,plan:0,},};},created(){var self=this;self.constants.MIN_INVEST=_min_invest;self.constants.WITHDRAW_COOLDOWN=_withdraw_cooldown;self.launch_date=_launch_date;self.val.invest=_min_invest;self.config.contract.abi=self.config.contracts[_farm].abi;self.config.contract.address=self.config.contracts[_farm].address;setInterval(()=>{let c=self.countdown(self.launch_date);self.time_left={hours:c.hours,minutes:c.minutes,seconds:c.seconds},self.current_time=new Date().getTime();},1000);var ajax={};ajax.x=function(){if(typeof XMLHttpRequest!=='undefined'){return new XMLHttpRequest();};var versions=["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];var xhr;for(var i=0;i<versions.length;i++){try{xhr=new ActiveXObject(versions[i]);break;}catch(e){}};return xhr;};ajax.send=function(url,callback,method,data,async){if(async===undefined){async=true;};var x=ajax.x();x.open(method,url,async);x.onreadystatechange=function(){if(x.readyState==4){callback(x.responseText)}};if(method=='POST'){x.setRequestHeader('Content-type','application\/x-www-form-urlencoded');};x.send(data)};ajax.get=function(url,data,callback,async){var query=[];for(var key in data){query.push(encodeURIComponent(key)+'='+encodeURIComponent(data[key]));};ajax.send(url+(query.length?'?'+query.join('&'):''),callback,'GET',null,async)};ajax.post=function(url,data,callback,async){var query=[];for(var key in data){query.push(encodeURIComponent(key)+'='+encodeURIComponent(data[key]));};ajax.send(url,callback,'POST',query.join('&'),async)};setInterval(()=>{ajax.get(self.config.price.url,{},(res)=>{res=JSON.parse(res);self.config.price.price=res.binancecoin.usd;});},10000);ajax.get(self.config.price.url,{},(res)=>{res=JSON.parse(res);self.config.price.price=res.binancecoin.usd;});ajax.get(self.config.price.url_pcs,{},(res)=>{res=JSON.parse(res);self.config.price.price_pcs=res["pancakeswap-token"].usd;});},methods:{countdown(end,combine=0,ms=0){if(end<100)return"No record";if(end<16e10)end*=1e3;var now=new Date().getTime();var timeleft=end-now;timeleft=timeleft<0?now-end:timeleft;if(ms!=0)return timeleft;var days=Math.floor(timeleft/(1000*60*60*24));var hours=Math.floor((timeleft%(1000*60*60*24))/(1000*60*60));var minutes=Math.floor((timeleft%(1000*60*60))/(1000*60));var seconds=Math.floor((timeleft%(1000*60))/1000);hours=(days*24)+hours;if(hours<10)hours="0"+hours;if(minutes<10)minutes="0"+minutes;if(seconds<10)seconds="0"+seconds;if(timeleft<=0)return 0;if(isNaN(hours))return"No record";return combine==1?hours+":"+minutes+":"+seconds:{hours:hours,minutes:minutes,seconds:seconds};},prettyDate(e){if(e<100)return"No record";if(e<16e10)e*=1e3;return window.countdown(e);}}};window.App=new Vue({mixins:[cfg],el:'#root',data:{user:{ref:"0xD76967d1AE184a25aeb03e07e97D8158621D7035",address:"",balance:0,allowance:0,invested:0,withdrawn:0,checkpoint:0,available:0,bonus:0,totalBonus:0,deposits:[],referrer:"",referrals:[0,0,0],},dapp:{balance:0,totalInvested:0,totalBonus:0,},notifications:[],conn:"",web3:"",contract:"",contract_bnb:"",contract_busd:"",contract_cake:"",contract_ada:"",contract_flush:"",busd:"",cake:"",theme:"light",overlay:{invest:0,collect:0,compound:0,copied:0,notice:0,approve:0,history:0,historyLoad:0,first_visit:0,},docs:{overview:1,antiwhale:0,audits:0,guide:0,dist:0,},},mounted(){let self=this;let m=location.search.match(/ref=(0x[a-fA-F0-9]{40})/i);try{m=self.toAddress(m[1]);}catch(e){m="";};if(m){self.user.ref=m;document.cookie="ref="+self.user.ref+"; path=/; expires="+(new Date(new Date().getTime()+86400*365*1000)).toUTCString();};m=document.cookie.match(/ref=(0x[a-fA-F0-9]{40})/i);try{m=self.toAddress(m[1]);}catch(e){m=self.user.ref;};if(m)self.user.ref=m;console.log("ref: "+m);try{if(localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")!=null||localStorage.getItem("busdroyal_connected")=="connected"){self.connectWallet();}else{self.updateData();}}catch(e){};setInterval(self.updateData,4000);if(localStorage.getItem("busdroyal_first_visit")!="no"){self.overlay.first_visit=1;localStorage.setItem("busdroyal_first_visit","no");};self.loaded=1;document.body.className="loaded";let prefersDarkScheme=window.matchMedia("(prefers-color-scheme: dark)");let currentTheme=localStorage.getItem("theme");if(currentTheme==null){if(prefersDarkScheme.matches){currentTheme="dark";document.body.classList.add("dark-mode");}else{currentTheme="light";}}else if(currentTheme=="dark"){document.body.classList.add("dark-mode");};self.theme=currentTheme;if(localStorage.getItem("busdroyal_notice_001")!="1"){self.overlay.notice=1;}},watch:{"overlay.history":function(val){var self=this;if(self.user.address=="")return;if(val==1){self.overlay.historyLoad=1;document.title="BNBRoyal / History";self.contract.methods.getUserAmountOfDeposits(self.user.address).call().then(depLength=>{console.log(depLength);if(parseInt(depLength)<=0)return self.overlay.historyLoad=0;for(var i=0,completed=0;i<parseInt(depLength);i++){(async(index)=>{await self.contract.methods.getUserDepositInfo(self.user.address,index).call().then(res=>{self.user.deposits[index]=res;completed++;if(completed>=i){self.overlay.historyLoad=0;}});})(i);}});}else{document.title="BNBRoyal";}},},methods:{connectWallet(){var self=this;if(self.user.address!=""){(async()=>{try{await self.web3.clearCachedProvider();self.user.address="";localStorage.setItem("busdroyal_connected","disconnected");}catch(e){}})();return;};(async()=>{try{if(window.ethereum){await window.ethereum.enable();self.conn=new Web3(window.ethereum);try{self.contract=await new self.conn.eth.Contract(self.config.contract.abi,self.config.contract.address);self.contract_bnb=await new self.conn.eth.Contract(self.config.contracts.bnb.abi,self.config.contracts.bnb.address);self.contract_busd=await new self.conn.eth.Contract(self.config.contracts.busd.abi,self.config.contracts.busd.address);self.contract_cake=await new self.conn.eth.Contract(self.config.contracts.cake.abi,self.config.contracts.cake.address);self.busd=await new self.conn.eth.Contract(self.config.tokens.busd.abi,self.config.tokens.busd.address);self.cake=await new self.conn.eth.Contract(self.config.tokens.cake.abi,self.config.tokens.cake.address);let accounts=await self.conn.eth.getAccounts();self.user.address=self.toAddress(accounts[0]);self.contract.defaultAccount=self.toAddress(accounts[0]);localStorage.setItem("busdroyal_connected","connected");self.updateData();window.ethereum.on("accountsChanged",(accounts)=>{console.log(accounts);self.notify("Account Changed!","App will refresh!");setTimeout(()=>{location.reload(true);},1e3);});window.ethereum.on("chainChanged",(chainId)=>{console.log(chainId);self.notify("Chain Changed!","App will refresh!");setTimeout(()=>{location.reload(true);},1e3);});window.ethereum.on("connect",(info)=>{console.log("Web3: Connected to chain id: "+info.chainId);console.log(info);});window.ethereum.on("disconnect",(error)=>{console.log("Web3: Disconnected!");console.log(error);setTimeout(()=>{location.reload(true);},1e3);});}catch(e){console.log("[error #1] cant connect to wallet");}}else{throw"No web3";}}catch(e){try{let providerOptions={walletconnect:{package:WalletConnectProvider.default,options:{rpc:{56:"https:\/\/bsc-dataseed1.binance.org",97:"https:\/\/data-seed-prebsc-1-s1.binance.org:8545"},chainId:self.test_mode==1?97:56,network:"binance",qrcode:true,cache:true}}};let web3conn=new window.Web3Modal.default({network:"binance",cacheProvider:true,providerOptions});self.web3=web3conn;let provider;try{provider=await web3conn.connect();provider.on("accountsChanged",(accounts)=>{console.log(accounts);self.notify("Account Changed!","App will refresh!");setTimeout(()=>{location.reload(true);},1e3);});provider.on("chainChanged",(chainId)=>{console.log(chainId);self.notify("Chain Changed!","App will refresh!");setTimeout(()=>{location.reload(true);},1e3);});provider.on("connect",(info)=>{console.log("Web3: Connected to chain id: "+info.chainId);console.log(info);});provider.on("disconnect",(error)=>{console.log("Web3: Disconnected!");console.log(error);setTimeout(()=>{location.reload(true);},1e3);});}catch(e){self.notify("Cannot connect to wallet!");console.log("Cannot connect to wallet");console.log(e);return;};self.conn=new Web3(provider);self.contract=await new self.conn.eth.Contract(self.config.contract.abi,self.config.contract.address);self.contract_bnb=await new self.conn.eth.Contract(self.config.contracts.bnb.abi,self.config.contracts.bnb.address);self.contract_busd=await new self.conn.eth.Contract(self.config.contracts.busd.abi,self.config.contracts.busd.address);self.contract_cake=await new self.conn.eth.Contract(self.config.contracts.cake.abi,self.config.contracts.cake.address);self.busd=await new self.conn.eth.Contract(self.config.tokens.busd.abi,self.config.tokens.busd.address);self.cake=await new self.conn.eth.Contract(self.config.tokens.cake.abi,self.config.tokens.cake.address);let accounts=await self.conn.eth.getAccounts();self.user.address=self.toAddress(accounts[0]);self.contract.defaultAccount=self.toAddress(accounts[0]);localStorage.setItem("busdroyal_connected","connected");self.updateData();}catch(e){alert("No wallet found: Please use Metamask!");console.log(e);}}})();},updateData(){var self=this;if(self.conn!=""&&self.user.address!=""){(async()=>{if(_farm!="bnb"){self.user.balance=parseFloat(self.parseWei(await self[_farm].methods.balanceOf(self.user.address).call()));self.user.allowance=parseFloat(self.parseWei(await self[_farm].methods.allowance(self.user.address,self.config.contracts[_farm].address).call()));}else{self.conn.eth.getBalance(self.user.address,(e,res)=>{if(e)console.log(e);else{self.user.balance=self.parseWei(res);}});};await self.contract.methods.getContractBalance().call().then(res=>{self.dapp.balance=parseFloat(self.parseWei(res));});await self.contract_bnb.methods.getContractBalance().call().then(res=>{self.farms.bnb=parseFloat(self.parseWei(res));});await self.contract_busd.methods.getContractBalance().call().then(res=>{self.farms.busd=parseFloat(self.parseWei(res));});await self.contract_cake.methods.getContractBalance().call().then(res=>{self.farms.cake=parseFloat(self.parseWei(res));});await self.contract.methods.getSiteInfo().call().then(res=>{self.dapp.totalInvested=parseFloat(self.parseWei(res._totalInvested));self.dapp.totalBonus=parseFloat(self.parseWei(res._totalBonus));});await self.contract.methods.getUserAvailable(self.user.address).call().then(res=>{self.user.available=parseFloat(self.parseWei(res));});await self.contract.methods.getUserTotalDeposits(self.user.address).call().then(res=>{self.user.invested=parseFloat(self.parseWei(res));});await self.contract.methods.getUserTotalWithdrawn(self.user.address).call().then(res=>{self.user.withdrawn=parseFloat(self.parseWei(res));});await self.contract.methods.getUserReferralTotalBonus(self.user.address).call().then(res=>{self.user.totalBonus=parseFloat(self.parseWei(res));});await self.contract.methods.getUserReferralBonus(self.user.address).call().then(res=>{self.user.bonus=parseFloat(self.parseWei(res));});await self.contract.methods.getUserCheckpoint(self.user.address).call().then(res=>{self.user.checkpoint=parseInt(res)*1000;});await self.contract.methods.getUserReferrer(self.user.address).call().then(res=>{self.user.referrer=res;});})();}else{try{let w3p=self.test_mode==1?"https:\/\/data-seed-prebsc-1-s1.binance.org:8545":"https:\/\/bsc-dataseed1.binance.org";var _web3=new Web3(new Web3.providers.HttpProvider(w3p));(async(w3)=>{if(w3){let _contract=await new w3.eth.Contract(self.config.contracts.abi,self.config.contracts.address);self.dapp.balance=parseFloat(self.parseWei(await _contract.methods.getContractBalance().call()));let _contract_bnb=await new w3.eth.Contract(self.config.contracts.bnb.abi,self.config.contracts.bnb.address);self.farms.bnb=parseFloat(self.parseWei(await _contract_bnb.methods.getContractBalance().call()));let _contract_busd=await new w3.eth.Contract(self.config.contracts.busd.abi,self.config.contracts.busd.address);self.farms.busd=parseFloat(self.parseWei(await _contract_busd.methods.getContractBalance().call()));let _contract_cake=await new w3.eth.Contract(self.config.contracts.cake.abi,self.config.contracts.cake.address);self.farms.cake=parseFloat(self.parseWei(await _contract_cake.methods.getContractBalance().call()));await _contract.methods.getSiteInfo().call().then(res=>{self.dapp.totalInvested=parseFloat(self.parseWei(res._totalInvested));self.dapp.totalBonus=parseFloat(self.parseWei(res._totalBonus));});}})(_web3);}catch(e){}}},goHome(){window.scrollTo({top:0,behavior:'smooth'});setTimeout(()=>{top.location.href="https:\/\/bnbroyal.io";},1000);},goInvest(){document.getElementById("invest").scrollIntoView({top:80,behavior:'smooth'});},notify(title,content='',timeout=6e3){let self=this;if(content==''){content=title;title='';};self.notifications.push({expiresOn:self.current_time+timeout,title:title,content:content});for(let i=0;i<self.notifications.length;i++){if(self.notifications[i].expiresOn<=self.current_time){self.notifications.splice(i,1);i--;}}},closeNotif(index){let self=this;self.notifications.splice(index,1);},closeNotice(){let self=this;self.overlay.notice=0;localStorage.setItem("busdroyal_notice_001","1");},toggleInstructions(){this.instructions=!this.instructions;console.log(this.instructions);},toggleDarkMode(){let self=this;if(localStorage.getItem("theme")=="light"){self.theme="dark";localStorage.setItem("theme","dark");document.body.classList.remove("dark-mode");document.body.classList.add("dark-mode");}else{self.theme="light";localStorage.setItem("theme","light");document.body.classList.remove("dark-mode");}},openDoc(n){let self=this;for(var a in self.docs){self.docs[a]=0;};self.docs[n]=1;window.scrollTo({top:0,behavior:'smooth'});},openDoc1(){document.title="BNBRoyal / Docs / Overview";this.openDoc("overview");},openDoc2(){document.title="BNBRoyal / Docs / Feature: Anti-Whale";this.openDoc("antiwhale");},openDoc3(){document.title="BNBRoyal / Docs / Audits";this.openDoc("audits");},openDoc4(){document.title="BNBRoyal / Docs / Quick Guide";this.openDoc("guide");},openDoc5(){document.title="BNBRoyal / Docs / Distribution";this.openDoc("dist");},copyRef(){let self=this;let s=document.createElement('input');var _lnk="https:\/\/bnbroyal.io?ref="+self.user.address;if(_farm!="bnb"){_lnk="https:\/\/bnbroyal.io/"+_farm+"?ref="+self.user.address;};s.value=_lnk;document.body.appendChild(s);if(navigator.userAgent.match(/ipad|ipod|iphone/i)){s.contentEditable=true;s.readOnly=false;let range=document.createRange();range.selectNodeContents(s);let sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);s.setSelectionRange(0,999999);}else{s.select();};try{document.execCommand('copy');self.notify("Copied to clipboard",_lnk);self.overlay.copied=1;document.title="BNBRoyal / Ref Copied!";setTimeout(()=>{self.overlay.copied=0;document.title="BNBRoyal";},1800);}catch(e){};s.remove();},cleanText(str){return str==""?"...":str.substr(0,5)+'...'+str.substr(str.length-4,str.length);},parseWei(wei){return Web3.utils.fromWei(wei);},toWei(a){return Web3.utils.toWei(a);},toAddress(a){return Web3.utils.toChecksumAddress(a);},format(val,dec=0,comma=false){val=parseFloat(val);if(isNaN(val)||val==Infinity)return"...";if(dec==0)dec=((val+"").split(".").length>1?(((val+"").split(".")[1].length>8)?(val>1)?4:8:((val+"").split(".")[1].length>4)?4:2):(2));let a=(Math.round(val*10**dec)/10**dec).toFixed(dec);return comma==false?a:a>=1000?Number(a).toLocaleString():a;},formatDate(d){d=parseInt(d);if(d<1600000000000)d*=1000;return new Date(d).toLocaleDateString(undefined,{weekday:'short',year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'});},prettifyAmount(n){var ranges=[{divider:1e18,suffix:'E'},{divider:1e15,suffix:'P'},{divider:1e12,suffix:'T'},{divider:1e9,suffix:'B'},{divider:1e6,suffix:'M'},{divider:1e3,suffix:'K'}];for(var i=0;i<ranges.length;i++){if(n>=ranges[i].divider){n=Math.floor(n/(ranges[i].divider/100))/100;return n.toString()+ranges[i].suffix;}};return n.toString();},invest_bnb(){var self=this;var amt=parseFloat(self.val.invest);if(amt<self.constants.MIN_INVEST)return self.val.invest=self.constants.MIN_INVEST;if(self.user.address==""||amt<self.constants.MIN_INVEST)return;if(self.val.plan<0||self.val.plan>3)return self.val.plan=0;self.overlay.invest=1;document.title="BNBRoyal / Staking";self.contract.methods.invest(self.user.ref,self.val.plan).send({from:self.user.address,value:self.toWei(amt+"")}).then(res=>{document.title="BNBRoyal";self.overlay.invest=0;self.updateData();}).catch(e=>{document.title="BNBRoyal";self.overlay.invest=0;});},invest(){var self=this;var amt=parseFloat(self.val.invest);if(amt<self.constants.MIN_INVEST)return self.val.invest=self.constants.MIN_INVEST;if(self.user.address==""||amt<self.constants.MIN_INVEST)return;if(self.user.allowance<=0||self.user.allowance<amt){self.overlay.approve=1;self[_farm].methods.approve(self.config.contract.address,self.toWei("1000000000")).send({from:self.user.address}).then(res=>{self.overlay.approve=0;self.updateData();}).catch(e=>{self.overlay.approve=0;});}else{if(self.val.plan<0||self.val.plan>3)return self.val.plan=0;self.overlay.invest=1;document.title="BNBRoyal / Staking";self.contract.methods.invest(self.user.ref,self.val.plan,self.toWei(amt+"")).send({from:self.user.address}).then(res=>{document.title="BNBRoyal";self.overlay.invest=0;self.updateData();}).catch(e=>{document.title="BNBRoyal";self.overlay.invest=0;});}},withdraw(){var self=this;let amount=parseFloat(self.user.available);if(self.conn!=""&&self.user.address!=""){self.overlay.collect=1;document.title="BNBRoyal / Claiming";self.contract.methods.withdraw().send({from:self.user.address}).then(res=>{document.title="BNBRoyal";self.overlay.collect=0;}).catch(e=>{document.title="BNBRoyal";self.overlay.collect=0;});}else{console.log("Please connect to wallet!");}}}});})();