### What is it ?

A queue that calls your callbacks with a uniform delay

### How do you use ?

1. Put the below at the end of your <body> (or somewhere else)
   <script src=timeoutqueue.js type=text/javascript></script>
   
2. Create a new TimeoutQueue object and pass the delay that you want in millisecs. Default is 1000ms.
   
       var t = new TimeoutQueue(2000);
   
3. As you want, enqueue your function with an argument obj containing a callback and a context object containing arguments to your callback:

        t.enqueue({callback: myfunc, context: myargs});
       
4. It will get enqueued and will get executed in insertion order a/c to the delay specified.

### Limitations?

Obvious limitation is that your callback will have to deal with the arguments as an object when it needs more than one. For example:

    function myfunc(arg1, arg2){

    }

This cannot be used as is but then you can write a wrapper that does:

    function wrapper(args){
	    myfunc(args.arg1, args.arg2);
    }

and then, you can pass your args like:

`t.enqueue({callback: wrapper, context: args}); //regular enqueue`

*OR*

`t.enqueueBeg({callback: wrapper, context: args}); //add to the beginning of queue`

### Context ?
I was writing the Simon game as a part of freecodecamp front-end development challenge
	 Was trying to call event handlers on each button press with a uniform delay but was not happening
	 So I wrote this

### Contributing/Issues:

Please open an issue
