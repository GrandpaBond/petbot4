function set_up_moods () {
    zMOOD_DEAD = 0
    zMOOD_ASLEEP = 1
    zMOOD_BORED = 2
    zMOOD_HAPPY = 3
    zMOOD_SAD = 4
    zMOOD_ANGRY = 5
    zMOOD_GOSH = 6
    zMOOD_SHIVER = 7
}
function look_left () {
    show_eyes(zEYES_LEFT)
    show_mouth(zMOUTH_LEFT)
    basic.pause(1000)
    show_eyes(my_eyes)
    show_mouth(my_mouth)
}
// In most moods, we temporarily switch between two faces.
// So we may be blinking, snoring, shivering or laughing etc.
// These are controlled by two time-periods: switch_gap sets how often, and switch_time says how long to show the alternate face.
// So if it's time to switch, this function changes faces
function _switch () {
    if (input.runningTime() > next_switch && !(switched)) {
        show_eyes(my_other_eyes)
        show_mouth(my_other_mouth)
        switched = true
    }
    if (switched && input.runningTime() > next_switch + switch_time) {
        show_mouth(my_mouth)
        show_eyes(my_eyes)
        switched = false
        serial.writeValue("energy", energy)
        serial.writeValue("mood", my_mood)
        serial.writeValue("switch_time", switch_time)
        serial.writeValue("switch_gap", switch_gap)
        serial.writeLine("")
    }
    next_switch = input.runningTime() + randint(switch_gap, switch_vary * switch_gap)
}
function all_mouths () {
    show_eyes(zEYES_OPEN)
    show_mouth(zMOUTH_FLAT)
    basic.pause(1000)
    show_mouth(zMOUTH_GRIN)
    basic.pause(1000)
    show_mouth(zMOUTH_HMMM)
    basic.pause(1000)
    show_mouth(zMOUTH_LEFT)
    basic.pause(1000)
    show_mouth(zMOUTH_OK)
    basic.pause(1000)
    show_mouth(zMOUTH_OPEN)
    basic.pause(1000)
    show_mouth(zMOUTH_RIGHT)
    basic.pause(1000)
    show_mouth(zMOUTH_SHOUT)
    basic.pause(1000)
    show_mouth(zMOUTH_SULK)
    basic.pause(1000)
}
function show_eyes (eyes: number) {
    z_pixels = eyes
    for (let zindex = 0; zindex <= 9; zindex++) {
        x = zindex % 5
        y = Math.floor(zindex / 5)
        if (z_pixels % 2 == 1) {
            led.plot(x, y)
        } else {
            led.unplot(x, y)
        }
        z_pixels = Math.floor(z_pixels / 2)
    }
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    excite(zMOOD_HAPPY, 100)
})
function look_right () {
    show_eyes(zEYES_RIGHT)
    show_mouth(zMOUTH_RIGHT)
    basic.pause(1000)
    show_eyes(my_eyes)
    show_mouth(my_mouth)
}
// Sometime, we should add some useful behaviour for button A 
input.onButtonPressed(Button.A, function () {
    look_left()
})
function excite (mood: number, amount: number) {
    next_mood = mood
    energy += amount
    if (energy > 300) {
        energy = 300
    }
}
function setup_eyes () {
    zEYES_LEFT = 873
    zEYES_MAD = 347
    zEYES_OPEN = 891
    zEYES_POP = 561
    zEYES_RIGHT = 882
    zEYES_SAD = 874
    zEYES_SHUT = 864
}
function show_mouth (mouth: number) {
    z_pixels = mouth
    for (let zindex = 0; zindex <= 14; zindex++) {
        x = zindex % 5
        y = 2 + Math.floor(zindex / 5)
        if (z_pixels % 2 == 1) {
            led.plot(x, y)
        } else {
            led.unplot(x, y)
        }
        z_pixels = Math.floor(z_pixels / 2)
    }
}
input.onGesture(Gesture.SixG, function () {
    excite(zMOOD_ANGRY, 300)
})
input.onSound(DetectedSound.Loud, function () {
    excite(zMOOD_GOSH, 300)
})
function all_eyes () {
    show_mouth(zMOUTH_FLAT)
    show_eyes(zEYES_OPEN)
    basic.pause(1000)
    show_eyes(zEYES_SHUT)
    basic.pause(1000)
    show_eyes(zEYES_LEFT)
    basic.pause(1000)
    show_eyes(zEYES_RIGHT)
    basic.pause(1000)
    show_eyes(zEYES_SAD)
    basic.pause(1000)
    show_eyes(zEYES_MAD)
    basic.pause(1000)
    show_eyes(zEYES_POP)
    basic.pause(1000)
}
// Sometime, we should add some useful behaviour for button B 
input.onButtonPressed(Button.B, function () {
    look_right()
})
input.onGesture(Gesture.Shake, function () {
    excite(zMOOD_GOSH, 50)
})
function set_mood (eyes: number, mouth: number, other_eyes: number, other_mouth: number, gap: number, time: number, vary: number) {
    my_eyes = eyes
    my_mouth = mouth
    my_other_eyes = other_eyes
    my_other_mouth = other_mouth
    switch_gap = gap
    switch_time = time
    switch_vary = vary
}
function setup_mouths () {
    zMOUTH_FLAT = 448
    zMOUTH_GRIN = 14880
    zMOUTH_HMMM = 14464
    zMOUTH_LEFT = 6176
    zMOUTH_OK = 4544
    zMOUTH_OPEN = 4420
    zMOUTH_RIGHT = 12800
    zMOUTH_SHOUT = 14784
    zMOUTH_SULK = 17856
}
input.onGesture(Gesture.ThreeG, function () {
    excite(zMOOD_GOSH, 100)
})
function new_mood (mood: number) {
    if (mood == zMOOD_DEAD) {
        basic.showIcon(IconNames.Skull)
    } else if (mood == zMOOD_ASLEEP) {
        set_mood(zEYES_SHUT, zMOUTH_FLAT, zEYES_SHUT, zMOUTH_HMMM, 1, 1, 1)
    } else if (mood == zMOOD_BORED) {
        set_mood(zEYES_SHUT, zMOUTH_FLAT, zEYES_SHUT, zMOUTH_HMMM, 1, 1, 1)
    } else if (mood == zMOOD_HAPPY) {
        set_mood(zEYES_SHUT, zMOUTH_FLAT, zEYES_SHUT, zMOUTH_HMMM, 1, 1, 1)
    } else if (mood == zMOOD_SAD) {
        set_mood(zEYES_SHUT, zMOUTH_FLAT, zEYES_SHUT, zMOUTH_HMMM, 1, 1, 1)
    } else if (mood == zMOOD_ANGRY) {
        set_mood(zEYES_SHUT, zMOUTH_FLAT, 1, zMOUTH_HMMM, 1, 1, 1)
    } else if (mood == zMOOD_GOSH) {
        set_mood(zEYES_SHUT, zMOUTH_FLAT, zEYES_SHUT, zMOUTH_HMMM, 1, 1, 1)
    } else if (mood == zMOOD_SHIVER) {
        set_mood(zEYES_SHUT, zMOUTH_FLAT, zEYES_SHUT, zMOUTH_HMMM, 1, 1, 1)
    } else if (mood == zMOOD_SHIVER) {
        set_mood(zEYES_SHUT, zMOUTH_FLAT, zEYES_SHUT, zMOUTH_HMMM, 1, 1, 1)
    }
    my_mood = mood
    if (my_mood != zMOOD_DEAD) {
        show_eyes(my_eyes)
        show_mouth(my_mouth)
    }
    serial.writeValue("new mood", my_mood)
    serial.writeLine("")
}
function check_environment () {
    if (input.lightLevel() - light_was > 50) {
        excite(zMOOD_GOSH, 200)
    } else if (input.lightLevel() < 100) {
        excite(zMOOD_SAD, 25)
    }
    light_was = input.lightLevel()
    if (input.temperature() < 15) {
        excite(zMOOD_SAD, 25)
    } else if (input.temperature() < 15) {
        excite(zMOOD_SHIVER, 300)
    }
}
function maybe_react () {
    energy += -1
    switch_gap = Math.constrain(Math.map(energy, -100, 100, 500, 5000), 500, 5000)
    switch_time = Math.constrain(Math.map(energy, -100, 100, 5000, 500), 500, 5000)
    if (energy > 100 && my_mood != next_mood) {
        // react to input
        new_mood(next_mood)
    } else if (energy > 0 && my_mood != zMOOD_BORED) {
        // get bored (or wake up)
        new_mood(zMOOD_BORED)
    } else if (energy < 0 && my_mood != zMOOD_ASLEEP) {
        // fall asleep
        new_mood(zMOOD_ASLEEP)
    } else if (energy < -100) {
        let zMOOD_SNORING = 0
        new_mood(zMOOD_SNORING)
    } else if (energy < -600) {
        // die of neglect!
        // ---permanently!
        new_mood(zMOOD_DEAD)
    } else {
    	
    }
}
function express () {
    show_eyes(zEYES_OPEN)
    show_mouth(zMOUTH_FLAT)
    basic.pause(1000)
    show_eyes(zEYES_SHUT)
    basic.pause(200)
    show_eyes(zEYES_OPEN)
    basic.pause(1000)
    show_mouth(zMOUTH_GRIN)
    basic.pause(2000)
    show_mouth(zMOUTH_FLAT)
    basic.pause(5000)
    show_eyes(zEYES_SAD)
    show_mouth(zMOUTH_SULK)
    basic.pause(1000)
    show_eyes(zEYES_SHUT)
    basic.pause(200)
    show_eyes(zEYES_SAD)
    basic.pause(1000)
    show_mouth(zMOUTH_GRIN)
    basic.pause(2000)
    show_mouth(zMOUTH_FLAT)
    basic.pause(5000)
    basic.pause(1000)
    basic.pause(1000)
}
let zEYES_SHUT = 0
let zEYES_SAD = 0
let zEYES_POP = 0
let zEYES_MAD = 0
let zEYES_RIGHT = 0
let y = 0
let x = 0
let z_pixels = 0
let zMOUTH_SULK = 0
let zMOUTH_SHOUT = 0
let zMOUTH_RIGHT = 0
let zMOUTH_OPEN = 0
let zMOUTH_OK = 0
let zMOUTH_HMMM = 0
let zMOUTH_GRIN = 0
let zMOUTH_FLAT = 0
let zEYES_OPEN = 0
let switch_vary = 0
let switch_gap = 0
let my_mood = 0
let switch_time = 0
let my_other_mouth = 0
let my_other_eyes = 0
let next_switch = 0
let my_mouth = 0
let my_eyes = 0
let zMOUTH_LEFT = 0
let zEYES_LEFT = 0
let zMOOD_SHIVER = 0
let zMOOD_GOSH = 0
let zMOOD_ANGRY = 0
let zMOOD_SAD = 0
let zMOOD_HAPPY = 0
let zMOOD_ASLEEP = 0
let zMOOD_DEAD = 0
let zMOOD_BORED = 0
let next_mood = 0
let energy = 0
let light_was = 0
let switched = false
setup_eyes()
setup_mouths()
set_up_moods()
let current = 11111
let others = 22222
let start = 33333
switched = false
light_was = input.lightLevel()
energy = 199
next_mood = zMOOD_BORED
// react to input
new_mood(next_mood)
basic.forever(function () {
	
})
loops.everyInterval(200, function () {
    if (my_mood != zMOOD_DEAD) {
        maybe_react()
        _switch()
    }
})
