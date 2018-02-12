let currentHandler = undefined;

const reset = ()  => {
    if (currentHandler) {
        currentHandler.close();
        setProgressBarTo(0);
    }
    currentHandler = undefined;
};

const tickEvents = () => {
    reset();
    const eventSource = new EventSource('/progress?ticks=1000&delay=50');
    eventSource.onmessage = (event) => {
        console.log(event);
        
        const data = JSON.parse(event.data);
        setProgressBarTo(data.current);
    };
    eventSource.onerror = function() {
        eventSource.close();
    };
    
    currentHandler = eventSource;
};

const setProgressBarTo = (value) => {
    const progressbarElement = document.getElementById("progressbar");
    progressbarElement.setAttribute("value", value);
};