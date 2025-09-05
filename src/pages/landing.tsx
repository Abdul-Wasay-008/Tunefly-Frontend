import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {

    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<number | null>(null);
    const SLIDES = 3; // update if you change the number of slides

    const [index, setIndex] = useState(0);     // active dot

    const handleScroll = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const i = Math.round(el.scrollLeft / el.clientWidth);
        setIndex(i % SLIDES); // stays 0..SLIDES-1
    };

    const goTo = (i: number) => {
        const el = scrollerRef.current;
        if (!el) return;
        stop(); // pause autoplay
        el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
        setTimeout(start, 800); // resume after a moment
    };


    const start = () => {
        if (timerRef.current !== null) return;
        // Respect reduced-motion
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

        timerRef.current = window.setInterval(() => {
            const el = scrollerRef.current;
            if (!el) return;
            const w = el.clientWidth;
            const curr = Math.round(el.scrollLeft / w);
            const next = (curr + 1) % SLIDES;
            el.scrollTo({ left: next * w, behavior: "smooth" });
        }, 3000); // 3s per slide
    };

    const stop = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        start();
        return stop; // cleanup on unmount
    }, []);

    return (
        <div>
            <div className="lg:hidden">
                <div className="min-h-screen w-full bg-[url('/background/Mobile-landing.webp')] bg-cover bg-no-repeat bg-top">
                    <div className="flex flex-col items-center ">
                        <div>
                            <img
                                src="/assets/LandingLogo.svg"
                                alt="Tunefly logo"
                                className="h-40 object-cover mt-10 w-auto"
                            />
                        </div>

                        <h1 className="text-white text-4xl font-bold">
                            Tunefly
                        </h1>

                        <p className="text-gray-400 text-lg text-center mt-6">For Drivers, Riders and Artists, everyone wins!</p>

                        <div className="flex text-white space-x-6 mt-8">
                            <div>
                                <Link to="/login">
                                    <button className="bg-gradient-to-r from-pink-500 via-blue-300 to-teal-400 font-semibold px-4 py-2 rounded-md cursor-pointer">Login as Artist</button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/admin/login">
                                    <button className="bg-gradient-to-r from-pink-500 via-blue-300 to-teal-400 font-semibold px-4 py-2 rounded-md cursor-pointer">Login as Admin</button>
                                </Link>
                            </div>
                        </div>

                        <p className="text-white font-bold text-xl text-center mt-8 mb-2">Tunefly turns your rideshare gig into personal concert, and pays for it.</p>

                        {/* --- Slider --- */}
                        <div
                            ref={scrollerRef}
                            className="w-full max-w-sm mt-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
                            onMouseEnter={stop}
                            onMouseLeave={start}
                            onTouchStart={stop}
                            onTouchEnd={() => setTimeout(start, 600)}
                            onScroll={handleScroll}   // <-- add this
                        >
                            <div className="flex w-full">
                                {/* Slide 1 */}
                                <section className="w-full shrink-0 snap-center px-2">
                                    {/* image ONLY (no border) */}
                                    <div className="rounded-t-2xl overflow-hidden">
                                        <img
                                            src="/assets/Car.png"
                                            alt="Driver"
                                            className="w-full h-72 object-cover"
                                        />
                                    </div>

                                    {/* caption with GRADIENT BORDER */}
                                    <div className="-mt-4 p-[1px] rounded-xl bg-gradient-to-r from-[#ED43A7] via-[#31DBC2] to-[#38C6FF]">
                                        <div className="rounded-xl bg-[#1f1f21] px-5 py-4 text-center">
                                            <h3 className="text-white text-2xl mt-2 font-extrabold leading-tight">Driver</h3>
                                            <p className="text-gray-200 text-sm mt-2">
                                                Drive, play & earn. It’s that simple. Every song played earns you more.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Slide 2 */}
                                <section className="w-full shrink-0 snap-center px-2">
                                    {/* image ONLY (no border) */}
                                    <div className="rounded-t-2xl overflow-hidden">
                                        <img
                                            src="/assets/ArtistPic.png"
                                            alt="Driver"
                                            className="w-full h-72 object-cover"
                                        />
                                    </div>

                                    {/* caption with GRADIENT BORDER */}
                                    <div className="-mt-4 p-[1px] rounded-xl bg-gradient-to-r from-[#ED43A7] via-[#31DBC2] to-[#38C6FF]">
                                        <div className="rounded-xl bg-[#1f1f21] px-5 py-4 text-center">
                                            <h3 className="text-white text-2xl mt-2 font-extrabold leading-tight">Artist</h3>
                                            <p className="text-gray-200 text-sm mt-2">
                                                Drive, play & earn. It’s that simple. Every song played earns you more.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Slide 3 */}
                                <section className="w-full shrink-0 snap-center px-2">
                                    {/* image ONLY (no border) */}
                                    <div className="rounded-t-2xl overflow-hidden">
                                        <img
                                            src="/assets/AppPic.png"
                                            alt="Driver"
                                            className="w-full h-72 object-cover"
                                        />
                                    </div>

                                    {/* caption with GRADIENT BORDER */}
                                    <div className="-mt-4 p-[1px] rounded-xl bg-gradient-to-r from-[#ED43A7] via-[#31DBC2] to-[#38C6FF]">
                                        <div className="rounded-xl bg-[#1f1f21] px-5 py-4 text-center">
                                            <h3 className="text-white text-2xl mt-2 font-extrabold leading-tight">Get the app</h3>
                                            <p className="text-gray-200 text-sm mt-2">
                                                Drive, play & earn. It’s that simple. Every song played earns you more.
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* dots */}
                        <div className="flex items-center justify-center gap-2 mt-3">
                            {Array.from({ length: SLIDES }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`h-2.5 w-2.5 rounded-full transition
                            ${index === i ? "bg-[#ED43A7] scale-110" : "bg-white/60"}`}
                                />
                            ))}
                        </div>
                        {/* --- /Slider --- */}

                        <h1 className="text-white font-semibold text-2xl mt-6">TuneFly - Music on the Move</h1>
                        <p className="text-gray-300 mt-4 text-justify px-6">
                            TuneFly is an app that lets drivers
                            earn money by playing music, artists
                            share their songs with new fans, and
                            riders enjoy a better trip. It  transforms
                            car rides into opportunities to make
                            money, discover music, and have fun,
                            all in one rewarding experience. Listen
                            music anywhere, anytime.
                        </p>
                        {/* --- Footer Card --- */}
                        <div className="w-full mt-10">
                            <div className="bg-[#161618] p-5 rounded-t-3xl">
                                {/* Brand row */}
                                <div className="flex items-center md:justify-center gap-3">
                                    <img src="/assets/logo.svg" alt="Tunefly logo" className="h-16 w-16" />
                                    <span className="text-white text-2xl font-semibold">Tunefly</span>
                                </div>

                                {/* Copy */}
                                <p className="text-gray-300 text-sm mt-6 text-justify">
                                    Skip boring rides. With TuneFly, riders get curated tracks from rising artists,
                                    drivers earn rewards, and every trip turns into an experience worth remembering.
                                </p>

                                {/* Go Mobile */}
                                <p className="text-white text-center font-semibold text-base mt-6">
                                    GO MOBILE
                                </p>

                                {/* Store badges */}
                                <div className="mt-6 flex items-center justify-center gap-3">
                                    <a href="#" aria-label="Get it on Google Play">
                                        <img
                                            src="/assets/android.svg"
                                            alt="Get it on Google Play"
                                            className="h-11 w-auto"
                                        />
                                    </a>
                                    <a href="https://apps.apple.com/pk/app/tunefly/id6477490869" rel="noopener noreferrer" target="_blank" aria-label="Download on the App Store">
                                        <img
                                            src="/assets/ios.svg"
                                            alt="Download on the App Store"
                                            className="h-11 w-auto"
                                        />
                                    </a>
                                </div>

                                {/* Links */}
                                <div className="mt-12 text-sm space-y-6">
                                    <a href="/privacy" className="block text-gray-400 underline underline-offset-2">Privacy Policy</a>
                                    <a href="/terms" className="block text-gray-400 underline underline-offset-2">Terms &amp; Conditions</a>
                                    <p className="text-gray-400">Copyright©2025@tunefly. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                        {/* --- /Footer Card --- */}

                    </div>
                </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:block">
                <div className="min-h-screen w-full bg-[url('/background/Web-landing.webp')] bg-cover bg-no-repeat bg-top">
                    {/* Top bar */}
                    <header className="max-w-7xl mx-auto px-14 2xl:px-0 pt-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/assets/logo.svg" alt="Tunefly logo" className="h-20 w-20" />
                            <span className="text-white text-3xl font-semibold">Tunefly</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link to="/login"
                                className="ml-2 px-5 py-2 rounded-lg font-semibold 
                     bg-gradient-to-r from-pink-500 via-blue-300 to-teal-400 text-white text-sm"
                            >
                                Login as an Artist
                            </Link>
                            <Link to="/admin/login"
                                className="ml-2 px-5 py-2 rounded-lg font-semibold 
                     bg-gradient-to-r from-pink-500 via-blue-300 to-teal-400 text-white text-sm"
                            >
                                Login as an Admin
                            </Link>
                        </div>
                    </header>

                    {/* Hero */}
                    <main className="max-w-7xl mx-auto px-14 2xl:px-0 pb-16 pt-10 grid grid-cols-12 gap-10 items-center">
                        {/* Left copy */}
                        <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                            <h1 className="text-white font-bold leading-tight text-5xl xl:text-6xl">
                                Turn Every Ride Into{" "}
                                <span className="bg-gradient-to-r from-pink-500 via-blue-300 to-teal-400 bg-clip-text text-transparent">
                                    Rewards!
                                </span>
                            </h1>
                            <p className="text-gray-300 text-xl mt-4">
                                For drivers, riders, and artists everyone wins
                            </p>

                            <div className="mt-14">
                                <p className="text-white text-2xl font-semibold">Download the App</p>
                                <div className="mt-5 flex items-center gap-5">
                                    <a href="https://apps.apple.com/pk/app/tunefly/id6477490869" target="_blank" aria-label="Download on the App Store">
                                        <img src="/assets/ios.svg" alt="App Store" className="h-14 w-auto" />
                                    </a>
                                    <a href="#" aria-label="Get it on Google Play">
                                        <img src="/assets/android.svg" alt="Google Play" className="h-14 w-auto" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right phone mock */}
                        <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                            <div className="relative w-full max-w-md ml-14 xl:ml-20 2xl:ml-32">
                                {/* Replace the src below with your desktop mock asset */}
                                <img
                                    src="/assets/HeroIphone.png"
                                    alt="TuneFly app mockup"
                                    className="w-full drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </main>
                </div>

                {/* Charcoal band */}
                <section className="bg-[#1f1f21]">
                    <div className="max-w-7xl mx-auto px-14 2xl:px-0 py-16">
                        <h2 className="text-white text-2xl font-bold text-center leading-tight">
                            TuneFly turns your rideshare into a concert—
                            <span className="whitespace-nowrap">and pays you.</span>
                        </h2>

                        <div className="mt-10 grid grid-cols-3 gap-16">
                            {/* Driver */}
                            <div className="text-center">
                                <img
                                    src="/assets/Car.png"
                                    alt="Driver"
                                    className="mx-auto h-52 xl:h-60 w-full max-w-xs rounded-sm object-cover shadow-lg"
                                />
                                <h3 className="mt-4 text-2xl font-semibold text-white">Driver</h3>
                                <p className="mx-auto mt-2 max-w-xs text-sm text-gray-300">
                                    Drive, play &amp; earn. It’s that simple. Every song played earns you more.
                                </p>
                            </div>

                            {/* Artist */}
                            <div className="text-center">
                                <img
                                    src="/assets/ArtistPic.png"
                                    alt="Artist"
                                    className="mx-auto h-52 xl:h-60 w-full max-w-xs rounded-sm object-cover shadow-lg"
                                />
                                <h3 className="mt-4 text-2xl font-semibold text-white">Artist</h3>
                                <p className="mx-auto mt-2 max-w-xs text-sm text-gray-300">
                                    Drive, play &amp; earn. It’s that simple. Every song played earns you more.
                                </p>
                            </div>

                            {/* Get the app */}
                            <div className="text-center">
                                <img
                                    src="/assets/AppPic.png"
                                    alt="Get the app"
                                    className="mx-auto h-52 xl:h-60 w-full max-w-xs rounded-sm object-cover shadow-lg"
                                />
                                <h3 className="mt-4 text-2xl font-semibold text-white">Get the app</h3>
                                <p className="mx-auto mt-2 max-w-xs text-sm text-gray-300">
                                    Drive, play &amp; earn. It’s that simple. Every song played earns you more.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Music on the Move section */}
                <section className="bg-gradient-to-b from-[#0B3B33] to-[#0D1C1B]">
                    <div className="max-w-7xl mx-auto px-14 2xl:px-8 py-20 grid grid-cols-12 gap-12 items-center">
                        {/* Left text */}
                        <div className="col-span-12 lg:col-span-6 ">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Music on the{" "}
                                <span className="text-[#31DBC2]">Move</span>
                            </h2>

                            <p className="mt-6 text-lg text-gray-200 leading-relaxed text-justify">
                                TuneFly is where drivers earn extra by playing music, artists
                                get their songs heard on the road, and riders enjoy a better trip.
                                It’s an app that turns every car ride into a chance for drivers to
                                make money and for artists to reach new fans. Simple, fun, and
                                rewarding, TuneFly is changing the way we think about our time
                                on the road. Join in, play tunes, earn cash, and discover music,
                                all from your car.
                            </p>
                        </div>

                        {/* Right images */}
                        <div className="lg:col-span-6 ml-12 xl:ml-32 2xl:ml-44">
                            <div className="flex gap-8">
                                <img
                                    src="/assets/2phones.png"
                                    alt="Dashboard app screen"
                                    className="h-[22rem] w-auto drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Footer */}
                <footer className="bg-[#232326]">
                    <div className="max-w-7xl mx-auto px-14 2xl:px-8 py-16 grid grid-cols-12 gap-10">
                        {/* Left side */}
                        <div className="col-span-12 lg:col-span-6">
                            <div className="flex items-center gap-4">
                                <img src="/assets/logo.svg" alt="Tunefly logo" className="h-16 w-16" />
                                <span className="text-white text-3xl font-semibold">Tunefly</span>
                            </div>

                            <p className="text-gray-300 text-sm mt-6 max-w-md">
                                Skip boring rides. With TuneFly, riders get curated tracks from rising artists,
                                drivers earn rewards, and every trip turns into an experience worth remembering.
                            </p>

                            <div className="mt-8 space-y-3 text-sm">
                                <a href="/privacy" className="block text-gray-400 underline underline-offset-2">
                                    Privacy Policy
                                </a>
                                <a href="/terms" className="block text-gray-400 underline underline-offset-2">
                                    Terms &amp; Conditions
                                </a>
                                <p className="text-gray-400">
                                    Copyright©2025@tunefly. All rights reserved.
                                </p>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="col-span-12 lg:col-span-6 flex flex-col items-start lg:items-center justify-start lg:justify-center">
                            <p className="text-white text-xl font-semibold mb-6 ml-14 xl:ml-32">GO MOBILE</p>
                            <div className="flex flex-col gap-4 ml-14 xl:ml-32">
                                <a href="#" aria-label="Get it on Google Play">
                                    <img
                                        src="/assets/android.svg"
                                        alt="Get it on Google Play"
                                        className="h-14 w-auto"
                                    />
                                </a>
                                <a href="https://apps.apple.com/pk/app/tunefly/id6477490869" target="_blank" aria-label="Download on the App Store">
                                    <img
                                        src="/assets/ios.svg"
                                        alt="Download on the App Store"
                                        className="h-14 w-auto"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}