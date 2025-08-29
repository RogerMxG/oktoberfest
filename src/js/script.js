var videoDuration = 0;
        var closeAvailableIn = 0;
        var confettiInterval;

        function launchConfetti() {
            var duration = 2500;
            var end = Date.now() + duration;
            (function frame() {
                confetti({
                    particleCount: 5,
                    spread: 110,
                    origin: { x: 0.5}
                });
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        }

        function startVideo() {
            document.getElementById('permissionModal').style.display = 'none';
            document.getElementById('videoOverlay').style.display = 'flex';
            var video = document.getElementById('introVideo');
            video.play();

            videoDuration = video.duration;  // Guardamos la duración total del video
            closeAvailableIn = 40; // Tiempo en segundos para habilitar el botón de cerrar

            var timeMessage = document.getElementById('timeMessage');
            setInterval(function () {
                if (closeAvailableIn > 0) {
                    timeMessage.textContent = `Puedes cerrar el video en ${closeAvailableIn} segundos.`;
                    closeAvailableIn--;
                } else {
                    document.getElementById('closeVideoBtn').style.display = 'block';
                    timeMessage.textContent = 'Puedes verlo completo o no mediocre? 😈';
                }
            }, 1000);
            // Lanzar confetti cada X segundos
            confettiInterval = setInterval(launchConfetti,5500);
        }

        function closeVideo() {
            var video = document.getElementById('introVideo');
            video.pause();  // Detenemos la reproducción del video
            document.getElementById('videoOverlay').style.display = 'none';
            document.getElementById('backgroundMusic').play();
            launchConfetti();
        }

        document.getElementById('introVideo').addEventListener('ended', function () {
            document.getElementById('videoOverlay').style.display = 'none';
            document.getElementById('backgroundMusic').play();
            launchConfetti();
        });