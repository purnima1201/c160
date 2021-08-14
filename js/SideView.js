AFRAME.registerComponent("place-side-view", {
    init: function() {
        this.createPlaces()
    },
    tick: function() {
        const placeContainer = document.querySelector("#places-component")
        const {state} = placeContainer.getAttribute("tour")
        if(state == "view" || state == "change-view") {
            this.el.setAttribute("visible", true);
        }
        else {
            this.el.setAttribute("visible", false);
        }
    },
    createPlaces: function() {
        const sideViewContainer = document.querySelector("#side-view-container")
        let previousXPosition = -150;
        let previousYPosition = 30;
        for(var i = 1; i<5; i++) {
            const position = {
                x: (previousXPosition +=50),
                y: (previousYPosition += 2),
                z: -40
            }
            const entityEl = this.createPlacesThumbnail("position", i);
            sideViewContainer.appendChild(entityEl);
        }
    },
    createPlacesThumbnail: function() {
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("id",`place-${id}`);
        entityEl.setAttribute("geometry", {
            primitive: "circle",
            radius: 2.5
        });
        entityEl.setAttribute("material", {
            src: "./assets/helicopter.png",
            opacity: 0.9
        });
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("cursor-events",{});
        return entityEl;
    }

})