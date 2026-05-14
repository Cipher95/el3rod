
document.addEventListener('DOMContentLoaded', () => {
	
    // --- DATA STORE ---
    const pageData = {
        home: {
            title: "مرحبا بك في العروض el3rod!",
            image: "el3rod-jpg.webp",
            content: `
                <p>لاختيار عروض أي جمعية اضغط على عروض الجمعيات.</p>
                
            `
        },
       		others: {
            title: "عروض الجمعيات",
            image: "el3rod-jpg.webp",
            intro: ``,
            games: [
                
                {
                    id: 'alrawda-hawalli',
                    title: 'جمعية الروضة وحولي التعاونية',
                    image: 'others/image_11~0.png',
					description: `
					<div class="project-card">
<embed width="100%" height="750px" src="https://el3rod.com/kuwait-offers/alrawda-hawalli-co-offers/">

</div>
					`
                },
				{
                    id: 'sultan_center',
                    title: 'مركز سلطان',
                    image: 'el3rod-jpg.webp',
					description: `
					<div class="project-card">
<embed width="100%" height="750px" src="https://el3rod.com/kuwait-offers/sultan-center-kuwait-offers/">

</div>
					`
                },
				{
                    id: 'nesto-hypermarket',
                    title: 'Nesto Hypermarket',
                    image: 'el3rod-jpg.webp',
					description: `
					<div class="project-card">
<embed width="100%" height="750px" src="https://el3rod.com/kuwait-offers/nesto-hypermarket-kuwait-offers/">
</div>
					`
                }
            ]
        }
    };

    // --- ELEMENT SELECTORS ---
    const contentArea = document.getElementById('content-area');
    const navLinks = document.querySelectorAll('.nav-link');
    const clockElement = document.getElementById('clock');
    const dateDayElement = document.getElementById('date-day');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const scrollToBottomBtn = document.getElementById('scroll-to-bottom-btn');

	 // --- FUNCTIONS ---

    

    /**
     * Builds and sets up the interactive content for the 'Others' page.
     * @param {object} othersData - The 'others' data object from pageData.
     */
    function setupOthersPage(othersData) {
        const displayArea = document.getElementById('others-display-area');
        if (!displayArea || !othersData.games || othersData.games.length === 0) return;

        const navButtonsHTML = othersData.games.map((game, index) =>
            `<button class="others-nav-btn ${index === 0 ? 'active' : ''}" data-game-id="${game.id}">${game.title}</button>`
        ).join('');

        const firstGame = othersData.games[0];

        const contentHTML = `
            <div class="others-nav-container">
                ${navButtonsHTML}
            </div>
            <div class="others-content-display">
                
                <div id="others-game-description" class="others-content-text">
                    ${firstGame.description}
                </div>
            </div>
        `;

        displayArea.innerHTML = contentHTML;

		
        const navButtons = displayArea.querySelectorAll('.others-nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const gameId = button.getAttribute('data-game-id');
                const gameData = othersData.games.find(g => g.id === gameId);
                if (!gameData) return;
			
                document.getElementById('others-game-description').innerHTML = gameData.description;

                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

			            });
        });
    }

    
	
	
		

    function switchContent(pageKey) {
    const data = pageData[pageKey];
    if (!data) return;

    contentArea.classList.add('fade-out');

    setTimeout(() => {

        let contentHTML = '';

        // HOME PAGE
        if (pageKey === 'home') {
            contentHTML = data.content;
        }

        // OTHERS PAGE
        else if (pageKey === 'others') {
            contentHTML = `
                <div id="others-display-area"></div>
            `;
        }

        const html = `
            <div class="content-wrapper">
                <div class="content-image">
                    <img src="${data.image}" alt="${data.title}">
                </div>

                <div class="content-text">
                    <h2>${data.title}</h2>
                    ${contentHTML}
                </div>
            </div>
        `;

        // THIS WAS MISSING
        contentArea.innerHTML = html;

        // setup interactive section
        if (pageKey === 'others') {
            setupOthersPage(data);
        }

        contentArea.classList.remove('fade-out');

    }, 300);
}

    /**
     * Updates the clock and date display.
     */
    function updateClock() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        const dateDayString = now.toLocaleDateString('en-US', dateOptions);

        clockElement.textContent = timeString;
        dateDayElement.textContent = dateDayString;
    }

    /**
     * Shows or hides the scroll buttons based on the user's scroll position.
     */
    function handleScrollButtons() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        if (scrollTop + clientHeight < scrollHeight - 50) {
            scrollToBottomBtn.classList.add('show');
        } else {
            scrollToBottomBtn.classList.remove('show');
        }
    }

     /**
     * Smoothly scrolls the window to the top.
     */
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Smoothly scrolls the window to the bottom.
     */
    function scrollToBottom() {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }

       // --- EVENT LISTENERS & INITIALIZATION ---

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const page = link.getAttribute('data-page');
            switchContent(page);
        });
    });

    
    window.addEventListener('scroll', handleScrollButtons);
    backToTopBtn.addEventListener('click', scrollToTop);
    scrollToBottomBtn.addEventListener('click', scrollToBottom);
    
    // Initialize the page
    switchContent('home');
    updateClock();
    setInterval(updateClock, 1000);
});
