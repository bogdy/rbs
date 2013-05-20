var animages = (function() 
{ 
    var sequences=[];

    var Sec=function(obj)
    {

        this.name= obj['containerid'];
        this.container = document.getElementById(obj['containerid']);
        this.images = new Array();
        this.imageFiles =  obj['array'];
        this.maxImages = obj['array'].length;
        this.imageCount = 0;
        this.fps=0;
        this.interval=0;
        this.img=null;
        this.loop=false;
        this.onLoadImages=obj['arrLoadCallback'];
        this.stopLoop=false;
        this.type=obj['type'];
        this.timeout;
        this.atEnd=obj['endAnimationCallback'];
        this.individualLoad=obj['individualLoadCallback'];
        this.originalarray;
        this.fromToactive=false;
    }

    Sec.prototype.init = function(type) 
    {
        var first=new Image();
        first.src=this.imageFiles[0];
        switch(type)
        {
            case "bg":
                 this.container.style.backgroundImage = "url("+first.src+")"; 
            break;
             case "img":
                this.container.appendChild(first);
            break;
        }

    }

    Sec.prototype.animate = function(f_p_s, loop) 
    {
         this.stopLoop=false;
        if(loop==true)
        {
            this.loop=true;
        }else
        {
            this.loop=false;
        }

        this.fps = f_p_s;
        this.interval = Math.round(1000 / f_p_s);
        animateImagesLoaded(this);
    }

    Sec.prototype.stopLoopAnimation = function() 
    {
       this.stopLoop=true;
    }

    Sec.prototype.restartAnimation = function(f_p_s, loop)
    {
       this.imageCount=0;
       this.animate(f_p_s, loop);
    }

    Sec.prototype.gotoAndPlayFrame = function(frame, f_p_s, loop)
    {
        
        this.gotoAndStopFrame(frame);
        this.animate(f_p_s, loop);
        
    }

    Sec.prototype.fromTo=function(initial_p, final_p, f_p_s, loop)
    {
        this.stopLoop=true;
        this.imageCount=0;
        this.fromToactive=true;
        var slicedarray;

        if(initial_p>final_p)
        {
            slicedarray=this.images.slice(final_p,initial_p)
            slicedarray.reverse();
        }else
        {
           slicedarray=this.images.slice(initial_p,final_p)

        }
        this.originalarray=this.images;
        this.images=slicedarray;
        this.animate(f_p_s, loop);
        this.maxImages = this.images.length;
    }

    function restartArray(e)
    {
        e.stopLoop=true;
        e.imageCount=0;
        e.fromToactive=false;
        e.images=e.originalarray;
    }

    Sec.prototype.gotoAndStopFrame = function(frame)
    {
        this.stopLoop=true;
        this.imageCount=frame; 
        switch(this.type)
        {
            case "bg":
                  this.container.style.backgroundImage = "url("+this.images[frame].src+")"; 
            break;
             case "img":
               var deadelement=this.container.firstChild;
                this.container.removeChild(this.container.firstChild);
                this.container.appendChild(this.images[frame]);
            break;
        } 
    }

    Sec.prototype.returnCurrentFrame= function()
    {
        return this.imageCount;
    }

    Sec.prototype.startTimeout=function()
    {
        var current=this;
        clearTimeout(this.timeout);
        this.timeout= setTimeout(function(){current.AnimateNextImage()}, this.interval);
    }



     Sec.prototype.AnimateNextImage=function()
    {
        if(this.imageCount == (this.maxImages)){
            this.imageCount = 0;
            if(this.atEnd!=undefined)
            {
                 this.atEnd();
            }    
            if(this.loop)
            {
                currentAnimation(this);
            }

            if(this.fromToactive)
            {
                restartArray(this);
            }    
            
        }else
        {
            currentAnimation(this)
        }

        function currentAnimation(c)
        {
            if(c.stopLoop==false)
            {
                 switch(c.type)
                {
                    case "bg":
                          c.container.style.backgroundImage = "url("+c.images[c.imageCount].src+")"; 
                    break;
                     case "img":
                       var deadelement=c.container.firstChild;
                        c.container.removeChild(c.container.firstChild);
                        c.container.appendChild(c.images[c.imageCount]);
                    break;
                }

                c.startTimeout();
                c.imageCount++;

            }    
        }
    }

    function controlLoad(current, callback, individualCallback)
    {
       
        var i;
        var currentId;
        for(i = 0; i < current.maxImages; i++)
        {
            currentId=current.name+'Image'+i;
            current.img = new Image();
            current.img.src = current.imageFiles[i];
            current.img.id = currentId;

            
            if(individualCallback!=undefined)
            {
                if ( current.img.addEventListener ) 
                { 
                     current.img.addEventListener( "load", function(){individualCallback(current.img)}, false );
                }
                else if ( current.img.attachEvent ) 
                { 
                        current.img.attachEvent( "onload", function(){individualCallback(current.img)} );
                } 
                else if ( current.img.onLoad ) 
                {
                        current.img.onload = function(){individualCallback(current.img)};
                }
                
            } 
             
            
            if(i == (current.maxImages - 1) && callback!=undefined)
            {
                current.img.current=current;

                if ( current.img.addEventListener ) 
                { 
                     current.img.addEventListener( "load", function(e)
                    {
                        callback(e);
                        if(individualCallback!=undefined)
                        {
                           individualCallback(current.img);
                        } 

                    }, false );
                }
                else if ( current.img.attachEvent ) 
                { 
                        current.img.attachEvent( "onload", function(e)
                        {
                            callback(e);
                            if(individualCallback!=undefined)
                            {
                               individualCallback(current.img);
                            } 

                        });
                } 
                else if ( current.img.onLoad ) 
                {
                        current.img.onload = function(e)
                        {
                            callback(e);
                            if(individualCallback!=undefined)
                            {
                               individualCallback(e);
                            } 

                        };
                }


               
            }
            current.images.push(current.img);
        }

    }


    function animateImagesLoaded(e)
    {
            switch(e.type)
            {
                case "bg":
                     e.container.style.backgroundImage = "url("+e.images[e.imageCount].src+")"; 
                break;
                 case "img":
                    if(e.container.firstChild!=null)
                    {
                        e.container.removeChild(e.container.firstChild);
                    }
                    e.container.appendChild(e.images[e.imageCount]);
                break;
            }
        e.startTimeout();
    }

    
    return {  
        //Public variables and methods  
        ANIMAGES: undefined,  
        create: function (obj) 
        {
            sequences[obj['containerid']]=new Sec(obj);
            sequences[obj['containerid']].init(obj['type']);
            controlLoad(sequences[obj['containerid']], sequences[obj['containerid']].onLoadImages, sequences[obj['containerid']].individualLoad)
        },
        animate:function(e, f_p_s, loop)
        {
            sequences[e].animate(f_p_s, loop);
        },
        stopLoop:function(e)
        {
            sequences[e].stopLoopAnimation();
        },
        restart:function(e, f_p_s, loop)
        {
            sequences[e].restartAnimation(f_p_s, loop);
        },
        gotoAndStop:function(e, frame)
        {
            sequences[e].gotoAndStopFrame(frame);
        },
        gotoAndPlay:function(e, frame, f_p_s, loop)
        {
            sequences[e].gotoAndPlayFrame(frame, f_p_s, loop);
        },
        currentFrame:function(e)
        {
            return sequences[e].returnCurrentFrame();
        },
        fromTo:function(e,initial_p, final_p, f_p_s, loop)
        {
            sequences[e].fromTo(initial_p, final_p, f_p_s, loop);
        }    

    };  
})();

