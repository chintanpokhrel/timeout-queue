var TimeoutQueueException = function(message){
	this.message = message;
	this.name = "TimeoutQueueException";
}

TimeoutQueueException.prototype.toString = function(){
	return this.name + ': "' + this.message + '"';
}

var TimeoutQueueNode = function(callback, context){
	this.callback = callback;
	this.context = context;
}

var TimeoutQueue = function(delay = 1000){
	//1. Initialize delay	
	this.delay = delay;
	//2. Create a queue
	var timeout_queue = [];

	var that = this;
	
	var check_enqueue_args = function(args){
		if(!(args.hasOwnProperty('callback') && args.hasOwnProperty('context'))){
			throw new TimeoutQueueException("Wrong data. Expected: {callback: 'your_callback', context: 'args_obj_to_callback'}.");	
		}

		return true;
	}
	
	this.enqueue = function(args){
		if(check_enqueue_args(args)){
			var node = new TimeoutQueueNode(args.callback, args.context);
			timeout_queue.push(node);
		}
	}

	this.enqueueBeg = function(args){
		if(check_enqueue_args(args)){
			var node = new TimeoutQueueNode(args.callback, args.context);
			timeout_queue.unshift(node);
		}
	}
		
	this.dequeue = function(){
		return timeout_queue.shift();	
	}

	this.empty = function(){
		timeout_queue = [];
	}

	//3. Schdeule callbacks to setInterval
	setInterval(function(){
		var node = that.dequeue();
		if(!(node === undefined)){
			node.callback(node.context);
		}	
	}, that.delay);
}
