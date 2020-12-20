import VanillaTilt from 'vanilla-tilt';

const rotateCard = () => {
    const card = document.querySelector('.wrapper__card');

    VanillaTilt.init(card, {
        max: 25,
        speed: 700
    });
}

rotateCard();