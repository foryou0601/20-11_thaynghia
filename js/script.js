/* =========================================================================
           1. CẤU HÌNH ẢNH CỦA THẦY NGHĨA (THAY ẢNH CỦA BẠN TẠI ĐÂY)
           Khi chạy trên VS Code, bỏ ảnh vào assets/images/anh-thay-nghia.jpg
           ========================================================================= */
        const TEACHER_PHOTO_URL = "assets/images/anh-thay-nghia.jpg";

        /* =========================================================================
           2. HỆ THỐNG ÂM THANH (HỖ TRỢ FILE MP3 HOẶC TỰ PHÁT NHẠC PIANO ÊM DỊU)
           ========================================================================= */
        let isMusicPlaying = false;
        let synthLoop = null;
        let synth = null;

        async function startMusic() {
            const bgMusic = document.getElementById('bgMusic');
            const musicBtn = document.getElementById('musicToggleBtn');
            musicBtn.classList.remove('hidden');

            // Ưu tiên phát file MP3 nếu người dùng đã chèn vào thẻ <audio>
            if (bgMusic.querySelector('source') && bgMusic.querySelector('source').getAttribute('src')) {
                try {
                    await bgMusic.play();
                    isMusicPlaying = true;
                    updateSoundIcon();
                    return;
                } catch (err) {
                    console.log("Chuyển sang giai điệu Piano tích hợp:", err);
                }
            }

            // Giai điệu Piano nhẹ nhàng, truyền cảm hứng tri ân Thầy giáo
            try {
                await Tone.start();
                if (!synth) {
                    synth = new Tone.PolySynth(Tone.Synth, {
                        oscillator: { type: "sine" },
                        envelope: { attack: 0.45, decay: 0.8, sustain: 0.45, release: 2.2 }
                    }).toDestination();
                    synth.volume.value = -10;

                    const melody = [
                        ["G4", "B4", "D5"], ["D5"], ["E5"], ["D5"],
                        ["C5", "E5", "G5"], ["B4"], ["A4"], ["G4"],
                        ["A4", "C5", "E5"], ["D5"], ["B4"], ["G4"],
                        ["D4", "F#4", "A4"], ["B4"], ["A4"], ["G4"]
                    ];
                    let step = 0;
                    synthLoop = new Tone.Loop((time) => {
                        const note = melody[step % melody.length];
                        synth.triggerAttackRelease(note, "2n", time);
                        step++;
                    }, "1.25s").start(0);
                }
                Tone.Transport.start();
                isMusicPlaying = true;
                updateSoundIcon();
            } catch (e) {
                console.warn("Không thể khởi tạo âm thanh:", e);
            }
        }

        function toggleMusic() {
            const bgMusic = document.getElementById('bgMusic');
            if (isMusicPlaying) {
                bgMusic.pause();
                if (typeof Tone !== 'undefined') Tone.Transport.pause();
                isMusicPlaying = false;
            } else {
                if (bgMusic.querySelector('source')) bgMusic.play();
                if (typeof Tone !== 'undefined') Tone.Transport.start();
                isMusicPlaying = true;
            }
            updateSoundIcon();
        }

        function updateSoundIcon() {
            document.getElementById('iconSoundOn').classList.toggle('hidden', !isMusicPlaying);
            document.getElementById('iconSoundOff').classList.toggle('hidden', isMusicPlaying);
        }

        /* =========================================================================
           3. HIỆU ỨNG ÁNH SAO TRI THỨC BAY LƠ LỬNG
           ========================================================================= */
        function createFloatingSparks() {
            const container = document.getElementById('sparksContainer');
            const icons = ['✨', '📘', '💡', '🌟'];
            for (let i = 0; i < 16; i++) {
                const p = document.createElement('div');
                p.className = 'floating-spark';
                p.textContent = icons[i % icons.length];
                p.style.fontSize = `${Math.random() * 11 + 12}px`;
                p.style.left = `${Math.random() * 100}%`;
                p.style.top = `${Math.random() * 100}%`;
                p.style.animationDelay = `${Math.random() * 5}s`;
                p.style.animationDuration = `${Math.random() * 4 + 5}s`;
                container.appendChild(p);
            }
        }

        /* =========================================================================
           4. MỞ THIỆP & HIỆU ỨNG BẮN HOA FULL MÀN HÌNH
           ========================================================================= */
        function openLetterExperience() {
            startMusic();

            document.body.classList.add('letter-stage-bg');
            const rays = document.getElementById('knowledgeRays');
            if (rays) rays.style.opacity = '0.2';

            const welcome = document.getElementById('welcomeScreen');
            const letter = document.getElementById('letterScreen');

            welcome.style.opacity = '0';
            setTimeout(() => {
                welcome.classList.add('hidden');
                letter.classList.remove('hidden');
                burstFlowers(28);
            }, 500);
        }

        function backToWelcome() {
            const welcome = document.getElementById('welcomeScreen');
            const letter = document.getElementById('letterScreen');

            document.body.classList.remove('letter-stage-bg');
            const rays = document.getElementById('knowledgeRays');
            if (rays) rays.style.opacity = '1';

            letter.classList.add('hidden');
            welcome.classList.remove('hidden');
            setTimeout(() => {
                welcome.style.opacity = '1';
            }, 50);
        }

        function sendFlowers() {
            showToast("💐 Đã gửi ngàn bông hoa tươi thắm đến Thầy Nghĩa!");
            burstFlowers(70); // Bắn 70 bông hoa phủ kín toàn màn hình
        }

        function burstFlowers(count) {
            const flowerIcons = ['🌻', '💐', '🌹', '🌷', '🌸', '🌺', '🌼', '✨', '💙'];

            for (let i = 0; i < count; i++) {
                const flower = document.createElement('div');
                flower.textContent = flowerIcons[i % flowerIcons.length];
                flower.className = 'fixed z-50 pointer-events-none select-none';
                
                const size = Math.random() * 22 + 20;
                flower.style.fontSize = `${size}px`;
                
                const startX = Math.random() * 100;
                flower.style.left = `${startX}vw`;
                flower.style.bottom = '-40px';
                flower.style.opacity = '1';
                flower.style.transition = `transform ${Math.random() * 1.5 + 1.8}s cubic-bezier(0.16, 1, 0.3, 1), opacity 2.8s ease-out`;
                
                document.body.appendChild(flower);

                const spreadX = (Math.random() - 0.5) * 65;
                const targetY = -(Math.random() * 95 + 15);
                const rotateDeg = (Math.random() - 0.5) * 720;

                setTimeout(() => {
                    flower.style.transform = `translate(${spreadX}vw, ${targetY}vh) rotate(${rotateDeg}deg) scale(${Math.random() * 0.6 + 0.8})`;
                    flower.style.opacity = '0';
                }, 30 + (i * 14));

                setTimeout(() => flower.remove(), 3500);
            }
        }

        function showToast(msg) {
            const toast = document.getElementById('toastMessage');
            toast.textContent = msg;
            toast.classList.remove('opacity-0');
            setTimeout(() => {
                toast.classList.add('opacity-0');
            }, 3200);
        }

        window.onload = function() {
            createFloatingSparks();
            const photoEl = document.getElementById('teacherPhoto');
            if (photoEl && TEACHER_PHOTO_URL) {
                photoEl.src = TEACHER_PHOTO_URL;
            }
        };