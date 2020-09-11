var numbersDraw = Vue.component("number-draw", {
    data(){
        return{
            backTimer: 0,
            numbersRemaining: Array.from(new Array(90), (v, i)=>{return i+1}),
            numbersDrawn: [],
            num:0,
            clockInt: null,
            drawInt: null
        }
    },
    template: `<div id= "number-draw">
    <div class= "grid-2">
        <div>
            Next number in: <b>{{backTimer}} secs</b>
        </div>
        <div>
            Drawn Number: <b>{{num}}</b>
        </div>
    </div>   
    <table id= "numbers-show">
        <tr v-for= "row in 9">
            <td v-for= "col in 10" v-bind:id= "genNum(row, col)">
                {{genNum(row, col)}}
            </td>
        </tr>
    </table>
    </div>`,
    methods: {
        genNum(row, column){
            if(column == 10){
                return row*10;
            } else {
                return `${row-1}${column}`;
            }
        },
        currentDraw(){
            var drawIndex = Math.floor(Math.random()*1000)%(this.numbersRemaining.length);
            var drawnNumber = this.numbersRemaining[drawIndex];
            drawnNumber = drawnNumber.toString().length == 1 ? "0"+drawnNumber : drawnNumber;
            this.numbersRemaining.splice(drawIndex, 1);
            document.getElementById(drawnNumber).classList.add("drawn");
            this.numbersDrawn.push(drawnNumber);
            this.num = drawnNumber;
            [].forEach.call(document.querySelectorAll("._t"), (el, i)=>{
                var elem = document.getElementById(`t${i+1}${drawnNumber}`)
                if(elem !== null){
                    elem.classList.add("drawn");
                }
            })
            if(this.numbersRemaining.length == 0){
                clearInterval(this.clockInt);
                clearInterval(this.drawInt);
                this.backTimer = "-"
                this.num = "-"
            }
        }
    },
    mounted: function(){
        var self = this;        
        this.$nextTick(function(){
            var i = 0;
            this.clockInt = setInterval(function(){
                i++;
                self.backTimer = (4-i)%4
                if(i == 4){
                    i = 0;
                }
            }, 1000)
            this.drawInt = setInterval(function(){
                self.currentDraw();
            }, 4000);
        })
    }
});
var tickets = Vue.component("h-ticket", {
    props: ["name", "id"],
    data() {
        return {
            ticketData: genTicket()
        }
    },
    methods: {
        sanitise(num, id = ""){
            if(num == 0){
                return "";
            } else {
                num = num.toString().length == 1 ? "0"+num : num;
                return id+num;
            }
        }
    },
    template: `<div class= "t">
    <span>{{name}}</span>
    <table id= "ticket" cellspacing= "10px">
        <tr v-for= "row in ticketData">
            <td v-for= "el of row" :id= "sanitise(el, id)" >
                {{sanitise(el)}}
            </td>
        </tr>
    </table>
    </div>`
})