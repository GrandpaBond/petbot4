function set_up_moods () {
    MOOD_DEAD = 0
    MOOD_ASLEEP = 1
    MOOD_AWAKE = 2
    MOOD_HAPPY = 3
    MOOD_SAD = 4
    MOOD_ANGRY = 5
    MOOD_GOSH = 6
}
function look_left () {
    show_eyes(energy)
    show_mouth(MOUTH_LEFT)
    basic.pause(500)
    show_eyes(my_eyes)
    show_mouth(my_mouth)
}
function all_mouths () {
    show_eyes(EYES_OPEN)
    show_mouth(MOUTH_FLAT)
    basic.pause(1000)
    show_mouth(MOUTH_GRIN)
    basic.pause(1000)
    show_mouth(MOUTH_HMMM)
    basic.pause(1000)
    show_mouth(MOUTH_LEFT)
    basic.pause(1000)
    show_mouth(MOUTH_OK)
    basic.pause(1000)
    show_mouth(MOUTH_OPEN)
    basic.pause(1000)
    show_mouth(MOUTH_RIGHT)
    basic.pause(1000)
    show_mouth(MOUTH_SHOUT)
    basic.pause(1000)
    show_mouth(MOUTH_SULK)
    basic.pause(1000)
}
function show_eyes (eyes: number) {
    pixels = eyes
    for (let index = 0; index <= 9; index++) {
        x = index % 5
        y = Math.floor(index / 5)
        if (pixels % 2 == 1) {
            led.plot(x, y)
        } else {
            led.unplot(x, y)
        }
        pixels = Math.floor(pixels / 2)
    }
}
function provoke (mood: number, amount: number) {
    if (amount > 0 - energy) {
        new_mood(MOOD_AWAKE)
    } else if (amount > 100 - energy) {
        new_mood(mood)
    }
    energy += amount
    if (energy > 200) {
        energy = 200
    }
}
function look_right () {
    show_eyes(EYES_RIGHT)
    show_mouth(MOUTH_RIGHT)
    basic.pause(500)
    show_eyes(my_eyes)
    show_mouth(my_mouth)
}
input.onButtonPressed(Button.A, function () {
    look_left()
})
function setup_eyes () {
    EYES_LEFT = 873
    EYES_MAD = 347
    EYES_OPEN = 891
    EYES_POP = 561
    EYES_RIGHT = 882
    EYES_SAD = 874
    EYES_SHUT = 864
}
function show_mouth (mouth: number) {
    pixels = mouth
    for (let index = 0; index <= 14; index++) {
        x = index % 5
        y = 2 + Math.floor(index / 5)
        if (pixels % 2 == 1) {
            led.plot(x, y)
        } else {
            led.unplot(x, y)
        }
        pixels = Math.floor(pixels / 2)
    }
}
input.onGesture(Gesture.SixG, function () {
    provoke(MOOD_ANGRY, 100)
})
input.onSound(DetectedSound.Loud, function () {
    provoke(MOOD_GOSH, 50)
})
function all_eyes () {
    show_mouth(MOUTH_FLAT)
    show_eyes(EYES_OPEN)
    basic.pause(1000)
    show_eyes(EYES_SHUT)
    basic.pause(1000)
    show_eyes(EYES_LEFT)
    basic.pause(1000)
    show_eyes(EYES_RIGHT)
    basic.pause(1000)
    show_eyes(EYES_SAD)
    basic.pause(1000)
    show_eyes(EYES_MAD)
    basic.pause(1000)
    show_eyes(EYES_POP)
    basic.pause(1000)
}
input.onButtonPressed(Button.B, function () {
    look_right()
})
input.onGesture(Gesture.Shake, function () {
    provoke(MOOD_AWAKE, 25)
})
function setup_mouths () {
    MOUTH_FLAT = 448
    MOUTH_GRIN = 14880
    MOUTH_HMMM = 14464
    MOUTH_LEFT = 6176
    MOUTH_OK = 4544
    MOUTH_OPEN = 4420
    MOUTH_RIGHT = 12800
    MOUTH_SHOUT = 14784
    MOUTH_SULK = 17856
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    provoke(MOOD_HAPPY, 25)
})
input.onGesture(Gesture.ThreeG, function () {
    provoke(MOOD_GOSH, 25)
})
function new_mood (mood: number) {
    if (mood == MOOD_DEAD) {
        basic.showIcon(IconNames.Skull)
    } else if (mood == MOOD_ASLEEP) {
        my_eyes = EYES_SHUT
        my_mouth = MOUTH_FLAT
        blinkgap = 2000
        blinktime = 1000
    } else if (mood == MOOD_AWAKE) {
        blinkgap = 800
        blinktime = 200
        my_eyes = EYES_OPEN
        my_mouth = MOUTH_FLAT
    } else if (mood == MOOD_HAPPY) {
        blinkgap = 500
        blinktime = 100
        my_eyes = EYES_OPEN
        my_mouth = MOUTH_GRIN
    } else if (mood == MOOD_SAD) {
        blinkgap = 1000
        blinktime = 800
        my_eyes = EYES_SAD
        my_mouth = MOUTH_SULK
    } else if (mood == MOOD_ANGRY) {
        blinkgap = 10000
        blinktime = 100
        my_eyes = EYES_MAD
        my_mouth = MOUTH_SHOUT
    } else if (mood == MOOD_GOSH) {
        blinkgap = 5000
        blinktime = 800
        my_eyes = EYES_POP
        my_mouth = MOUTH_OPEN
    }
    my_mood = mood
    if (my_mood != MOOD_DEAD) {
        show_eyes(my_eyes)
        show_mouth(my_mouth)
    }
}
function maybe_blink_or_snore () {
    if (input.runningTime() > next_blink && !(blinking)) {
        if (my_mood == MOOD_ASLEEP) {
            show_mouth(MOUTH_OPEN)
        } else {
            show_eyes(EYES_SHUT)
        }
        blinking = true
    }
    if (blinking && input.runningTime() > next_blink + blinktime) {
        if (my_mood == MOOD_ASLEEP) {
            show_mouth(my_mouth)
        } else {
            show_eyes(my_eyes)
        }
        next_blink = input.runningTime() + randint(blinkgap, 3 * blinkgap)
        blinking = false
    }
}
function tire (amount: number) {
    if (amount > energy) {
        new_mood(MOOD_AWAKE)
    } else if (amount > energy - -100) {
        new_mood(MOOD_ASLEEP)
    } else if (amount > energy - -600) {
        new_mood(MOOD_DEAD)
    }
    energy += 0 - amount
}
function express () {
    show_eyes(EYES_OPEN)
    show_mouth(MOUTH_FLAT)
    basic.pause(1000)
    show_eyes(EYES_SHUT)
    basic.pause(200)
    show_eyes(EYES_OPEN)
    basic.pause(1000)
    show_mouth(MOUTH_GRIN)
    basic.pause(2000)
    show_mouth(MOUTH_FLAT)
    basic.pause(5000)
    show_eyes(EYES_SAD)
    show_mouth(MOUTH_SULK)
    basic.pause(1000)
    show_eyes(EYES_SHUT)
    basic.pause(200)
    show_eyes(EYES_SAD)
    basic.pause(1000)
    show_mouth(MOUTH_GRIN)
    basic.pause(2000)
    show_mouth(MOUTH_FLAT)
    basic.pause(5000)
    basic.pause(1000)
    basic.pause(1000)
}
let blinking = false
let EYES_SHUT = 0
let EYES_SAD = 0
let EYES_POP = 0
let EYES_MAD = 0
let EYES_LEFT = 0
let EYES_RIGHT = 0
let y = 0
let x = 0
let pixels = 0
let MOUTH_SULK = 0
let MOUTH_SHOUT = 0
let MOUTH_RIGHT = 0
let MOUTH_OPEN = 0
let MOUTH_OK = 0
let MOUTH_HMMM = 0
let MOUTH_GRIN = 0
let MOUTH_LEFT = 0
let MOOD_GOSH = 0
let MOOD_ANGRY = 0
let MOOD_SAD = 0
let MOOD_HAPPY = 0
let MOOD_ASLEEP = 0
let MOOD_DEAD = 0
let energy = 0
let MOOD_AWAKE = 0
let my_mood = 0
let MOUTH_FLAT = 0
let my_mouth = 0
let EYES_OPEN = 0
let my_eyes = 0
let next_blink = 0
let blinktime = 0
let blinkgap = 0
setup_eyes()
setup_mouths()
set_up_moods()
let start = input.runningTime()
blinkgap = 3000
blinktime = 300
next_blink = input.runningTime() + blinkgap
my_eyes = EYES_OPEN
my_mouth = MOUTH_FLAT
show_eyes(my_eyes)
show_mouth(my_mouth)
my_mood = MOOD_AWAKE
energy = 100
let light_was = input.lightLevel()
basic.forever(function () {
	
})
loops.everyInterval(100, function () {
    maybe_blink_or_snore()
    tire(1)
    if (input.lightLevel() < 100) {
        provoke(MOOD_SAD, 25)
    } else if (input.lightLevel() - light_was > 50) {
        provoke(MOOD_GOSH, 100)
    }
    light_was = input.lightLevel()
})
