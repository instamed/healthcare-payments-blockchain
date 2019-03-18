export const Mixin = {
    
    created(){        
    },
	data(){
		return {     
          saving: false,      
          timer: 0
		}
	},   
	methods:{
        startTimer() {
            let that = this;
            let interval = 1000
            if(this.target_time) interval = (this.target_time / 20) * 1000
            setTimeout(function() {
              that.incrementTimer();
            }, interval);
          },
          incrementTimer() {
            if (this.timer < 95 && this.saving) {
              this.timer = this.timer + 5;
              this.startTimer();
            }
          },
	}

}