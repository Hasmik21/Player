"use strict";

const Player = {
    music : [
        {
            song: '../songs/Без тебя.mp3',
            image: '../img/t1.jpg',
            singerName: 'Севак Ханагян',
            songName: 'Без тебя'
        },
        {
            song: '../songs/Сон.mp3',
            image: '../img/t2.jpg',
            singerName: 'Севак Ханагян',
            songName: 'Сон'
        },
        {
            song: '../songs/До Луны.mp3',
            image: '../img/t3.jpg',
            singerName: 'Севак Ханагян',
            songName: 'До Луны'
        }
    ],
    audioPlayer : document.querySelector('.audioplayer .audio'),
    audioPlay : document.querySelector('.audioplayer .controls .play'),
    audioStart : document.querySelector('.audioplayer .controls .play .start'),
    audioPause : document.querySelector('.audioplayer .controls .play .pause'),
    audioPrev : document.querySelector('.audioplayer .controls .prev'),
    audioNext : document.querySelector('.audioplayer .controls .next'),
    playerTrack : document.querySelector('.player .player-track'),
    audioTime : document.querySelector('.time input'),
    audioPic : document.querySelector('.audioplayer .image'),
    singerName : document.querySelector('.player .player-track .artistName'),
    songName : document.querySelector('.player .player-track .songName'),
    bg : document.querySelector('.bg'),
    trackTime: document.querySelector('.player .player-track .time .track-time'),
    audioCurrentTime: document.querySelector('.time .track-time .current-time'),
    musicDuration: document.querySelector('.player .player-track .time .track-time .music-duration')
}
Player.audioPlayer.src = Player.music[0].song;
const audioFunction = {
    current: 0,
    play() {
        Player.audioPlayer.play();
        Player.playerTrack.style.top = -114 + 'px';
        Player.audioPic.style.animation = 'playanimation  3s linear infinite';
        Player.audioPause.style.opacity = 1;
        Player.audioPause.style.visibility = 'visible';
        Player.audioStart.style.opacity = 0;
        Player.audioStart.style.visibility = 'hidden';
        let min = Math.floor(Player.audioPlayer.duration / 60);
        let sec = Math.floor(Player.audioPlayer.duration % 60);
        Player.musicDuration.innerHTML = min + ':' + sec;
        setInterval(() => {
            let mins = Math.floor(Player.audioPlayer.currentTime / 60);
            let sec = Math.floor(Player.audioPlayer.currentTime % 60);
            if (sec < 10) {
                sec = '0' + String(sec);
            }
            Player.audioCurrentTime.innerHTML = mins + ':' + sec;
        }, 10)
    },
    nextPrev() {
        Player.audioPic.style.backgroundImage = `url(${Player.music[audioFunction.current].image})`;
        Player.bg.style.backgroundImage = `url(${Player.music[audioFunction.current].image})`;
        Player.singerName.innerText = Player.music[audioFunction.current].singerName;
        Player.songName.innerText = Player.music[audioFunction.current].songName;
        Player.audioPlayer.src = Player.music[audioFunction.current].song;
        Player.audioPlayer.play();
    },
    next() {
        audioFunction.current++;
        audioFunction.current == Player.music.length ? audioFunction.current = 0 : '';
        let min = Math.floor(Player.audioPlayer.duration / 60);
        let sec = Math.floor(Player.audioPlayer.duration % 60);
        Player.musicDuration.innerHTML = min + ':' + sec;
        audioFunction.nextPrev();
    },
    prev() {
        audioFunction.current--;
        audioFunction.current < 0 ? audioFunction.current = Player.music.length - 1 : '';
        let min = Math.floor(Player.audioPlayer.duration / 60);
        let sec = Math.floor(Player.audioPlayer.duration % 60);
        Player.musicDuration.innerHTML = min + ':' + sec;
        audioFunction.nextPrev();
    },
    pause() {
        Player.audioPlayer.pause();
        Player.playerTrack.style.top = 0 + 'px';
        Player.audioStart.style.opacity = 1;
        Player.audioStart.style.visibility = 'visible';
        Player.audioPause.style.opacity = 0;
        Player.audioPause.style.visibility = 'hidden';
        Player.audioPic.style.animation = 'none';
    },
    time() {
        Player.audioPlayer.currentTime = Player.audioPlayer.duration * (Player.audioTime.value / 100);
    },
    update() {
        Player.audioTime.value = Player.audioPlayer.currentTime * (100 / Player.audioPlayer.duration);

        if (Player.audioPlayer.ended) {
            audioFunction.current++;
            if (audioFunction.current == Player.music.length) {
                audioFunction.current = 0;
            }
            audioFunction.nextPrev();
        }
    }
}
Player.audioStart.addEventListener('click', audioFunction.play);
Player.audioPause.addEventListener('click', audioFunction.pause);
Player.audioNext.addEventListener('click', audioFunction.next);
Player.audioPrev.addEventListener('click', audioFunction.prev);
Player.audioTime.addEventListener('input', audioFunction.time);
Player.audioPlayer.addEventListener('timeupdate', audioFunction.update);
