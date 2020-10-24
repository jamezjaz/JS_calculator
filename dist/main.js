(()=>{"use strict";const e=document.querySelectorAll("[data-number]"),t=document.querySelectorAll("[data-operation]"),r=document.querySelector("[data-equals]"),n=document.querySelector("[data-delete]"),a=document.querySelector("[data-all-clear]"),i=document.querySelector("[data-previous-operand]"),s=document.querySelector("[data-current-operand]");(()=>{const e=document.querySelector("#footer"),t=document.createElement("div");t.classList="bg-dark text-center text-white py-4",t.innerHTML="\n                        &copy; 2020 <strong>Jamezjaz || JavaScript Calculator</strong>\n                        ",e.appendChild(t)})();const o=new class{constructor(e,t){this.previousOperandTextElement=e,this.currentOperandTextElement=t,this.clear()}clear(){this.currentOperand="",this.previousOperand="",this.operation=void 0}delete(){this.currentOperand=this.currentOperand.toString().slice(0,-1)}appendNumber(e){"."===e&&this.currentOperand.includes(".")||(this.currentOperand=this.currentOperand.toString()+e.toString())}chooseOperation(e){""!==this.currentOperand&&(""!==this.currentOperand&&""!==this.previousOperand&&this.compute(),this.operation=e,this.previousOperand=this.currentOperand,this.currentOperand="")}compute(){let e;const t=parseFloat(this.previousOperand),r=parseFloat(this.currentOperand);if(!isNaN(t)&&!isNaN(r)){switch(this.operation){case"+":e=t+r;break;case"-":e=t-r;break;case"*":e=t*r;break;case"÷":e=t/r;break;default:return}this.readyToReset=!0,this.currentOperand=e,this.operation=void 0,this.previousOperand=""}}getDisplayNumber(e){const t=e.toString(),r=parseFloat(t.split(".")[0]),n=t.split(".")[1];let a;return a=isNaN(r)?"":r.toLocaleString("en",{maximumFractionDigits:0}),null!=n?`${a}.${n}`:a}updateDisplay(){this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand),null!=this.operation?this.previousOperandTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`:this.previousOperandTextElement.innerText=""}}(i,s);e.forEach((e=>{e.addEventListener("click",(()=>{o.appendNumber(e.innerText),o.updateDisplay()}))})),t.forEach((e=>{e.addEventListener("click",(()=>{o.chooseOperation(e.innerText),o.updateDisplay()}))})),r.addEventListener("click",(()=>{o.compute(),o.updateDisplay()})),a.addEventListener("click",(()=>{o.clear(),o.updateDisplay()})),n.addEventListener("click",(()=>{o.delete(),o.updateDisplay()}))})();