AFRAME.registerComponent("cursor-events", {
    schema:{
        selectedItemId:{ default:"", type:"string"}
    },

    init:function(){
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()
        this.handleClickEvents();
    },
    handleClickEvents:function(){
        this.el.addEventListener("click",(evt)=>{
            const placeContainer = document.querySelector("#places-container");
            const {state} = placeContainer.getAttribute("tour");
            if(state == "places-list"){
                const id  = this.el.getAttribute("id");
                const placesId = ["new-york-city","taj-mahal","eiffel-tower","budapest"];
                if(placesId.includes(id)){
                    placeContainer.setAttribute("tour",{
                        state:"view",
                        selectedCard:id
                    })
                }
            }
            if(state == "view" || state == "change-view"){
                this.handleViewState();
            }
        })      
    },
    handleViewState: function() {
        const el = this.el;
        const id  =  el.getAttribute("id");
        const placesContainer = document.querySelector("#places-container");
        const { selectedItemId } = placesContainer.getAttribute("cursor-events");
        const sideViewPlacesId = ["place-1", "place-2", "place-3", "place-4"];
        if(sideViewPlacesId.includes(id)){
            placesContainer.setAttribute("tour", {
                state: "change-view"
            });
            const skyEl = document.querySelector("#main-container");
      
        //Set the 360 degree image to the sky element.
        skyEl.setAttribute("material", {
            src: `./assets/360_images/${selectedItemId}/${id}.jpg`,
            color: "#fff"
        });
        }
    },
    handleMouseEnterEvents: function() {
        // Mouse Enter Events
        this.el.addEventListener("mouseenter", () => {
          const placeContainer = document.querySelector("#places-container");
          const { state } = placeContainer.getAttribute("tour");
          if (state === "places-list") {
            this.handlePlacesListState();
          }
        });
    },
    handlePlacesListState:function(){
        const id= this.el.getAttribute("id");
        const placesId = ["new-york-city","taj-mahal","eiffel-tower","budapest"];
        if (placesId.includes(id)){
            const placeContainer = document.querySelector("#places-container");
            placeContainer.setAttribute("cursor-events",{
                selectedItemId:id
            })
            this.el.setAttribute("material",{
                color:"red",
                opacity:1
            })
        }
    },
    
    handleMouseLeaveEvents: function() {
        // Mouse Leave Events
        this.el.addEventListener("mouseleave", () => {
          const placesContainer = document.querySelector("#places-container");
          const { state } = placesContainer.getAttribute("tour");
          if (state === "places-list") {
            const { selectedItemId } = this.data;
            if (selectedItemId) {
              const el = document.querySelector(`#${selectedItemId}`);
              const id = el.getAttribute("id");
              if (id == selectedItemId) {
                el.setAttribute("material", {
                  color: "#0077CC",
                  opacity: 1
                });
              }
            }
          }
        });
    },
    
}) 