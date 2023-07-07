status = "";
objects = [];
function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}
function start()
{
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
    object_name = document.getElementById("input").value
}
function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
}
function draw()
{
    image(video,0,0,480,380)
    if(status != "")
    {
        objectDetector.detect( video, gotResults);
        
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : objects detected : ";
            
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red")
            rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
            if(objects[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("objectFound").innerHTML = object_name+" Found";
                a = window.speechSynthesis;
                b = new SpeechSynthesisUtterance(object_name+" Found");
                a.speak();
            }
            else
            {
                document.getElementById("objectFound").innerHTML = object_name+" Not Found";
            }
        }
    }
}
function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results
}