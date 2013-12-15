/*
 * Cards And Decks functionality
 */

exports.playingCards = function (conf) {
    var c = exports.objExtend(exports.playingCards.defaults, conf);
    this.conf = c;
    this.init();
    if (this.conf.startShuffled) {
        this.shuffle(5);
    }
    return this;
};

/**
 * initializer - builds the deck
 */
exports.playingCards.prototype.init = function () {
    this.cards = [];
    var o = this.conf,
        l, i, s, r, j;
    // populate draw pile
    for (i = 0; i < o.decks; i++) {
        // standard
        for (s in o.suits) {
            for (r in o.ranks) {
                l = this.cards.length;
                this.cards[l] = new exports.playingCards.card(r, o.ranks[r], s, o.suits[s]);
            }
        }
    }
};

exports.playingCards.defaults = {
    "decks": 1,
    "startShuffled": true,
    "jokers": 2,
    "jokerText": "Joker",
    "ranks": {
        "2": "Two",
        "3": "Three",
        "4": "Four",
        "5": "Five",
        "6": "Six",
        "7": "Seven",
        "8": "Eight",
        "9": "Nine",
        "10": "Ten",
        "J": "Jack",
        "Q": "Queen",
        "K": "King",
        "A": "Ace"
    },
    "suits": {
        "♠": "Spades",
        "♦": "Diamonds",
        "♣": "Clubs",
        "♥": "Hearts"
    }
};

// Card Object
exports.playingCards.card = function (rank, rankString, suit, suitString) {
    if (! (this instanceof exports.playingCards.card)) {
        return new exports.playingCards.card(rank, rankString, suit, suitString);
    }

    if (suit === undefined) {
        //Arguments are rank, suit
        suit = rankString;
        rankString = exports.playingCards.defaults.ranks[rank];
        suitString = exports.playingCards.defaults.suits[suit];
    }

    this.rank       = rank;
    this.rankString = rankString;
    this.suit       = suit;
    this.suitString = suitString;
    return this;
};

exports.playingCards.prototype.shuffle = function (n) {
    if (!n) {
        n = 5;
    }
    var l = this.cards.length,
        r, tmp, i, j;

    for (i = 0; i < n; i++) {
        for (j = 0; j < l; j++) {
            r = Math.floor(Math.random() * l);
            tmp = this.cards[j];
            this.cards[j] = this.cards[r];
            this.cards[r] = tmp;
        }
    }
};


// Helpers

/**
 * Simple object extend to override default settings
 */
exports.objExtend = function (o, ex) {
    if (!ex) {
        return o;
    }
    for (var p in ex) {
        o[p] = ex[p];
    }
    return o;
};