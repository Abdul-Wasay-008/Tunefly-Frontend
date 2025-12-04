export default function PrivacyPolicy() {
    return (
        <div>
            {/* Mobile layout */}
            <div className="lg:hidden">
                <div className="min-h-screen w-full bg-[url('/background/Mobile-landing.webp')] bg-cover bg-no-repeat bg-top p-6 flex items-center justify-center">
                    <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-xl w-full">
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center mb-6">
                            Privacy Policy
                        </h1>

                        <p className="mb-4 leading-relaxed">
                            TuneFly respects your privacy. We are committed to protecting your personal information and ensuring a safe user experience.
                        </p>

                        <Section title="Information We Collect">
                            We collect minimal data required to provide app functionality, such as account details and music uploads.
                        </Section>

                        <Section title="How We Use Your Information">
                            Your information is only used to operate core features of the app. We do not sell or share your data with third parties.
                        </Section>

                        <Section title="How to Delete Your Account">
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Log into your account</li>
                                <li>Go to the Settings page</li>
                                <li>Click on <strong>"Delete my account permanently"</strong></li>
                                <li>Confirm the popup by selecting <strong>"Delete"</strong></li>
                            </ol>
                        </Section>

                        <Section title="Contact Us">
                            If you have questions, reach us at{" "}
                            <a href="mailto:support@tunefly.io" className="text-purple-600 font-semibold">
                                tuneflyadmin@gmail.com
                            </a>.
                        </Section>

                        <p className="text-xs text-gray-600 text-center mt-6">Last updated: September 2025</p>
                    </div>
                </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:flex items-center justify-center">
                <div className="min-h-screen w-full bg-[url('/background/Web-landing.webp')] bg-cover bg-no-repeat bg-top p-16">
                    <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/70 rounded-3xl p-12 shadow-2xl">
                        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center mb-10">
                            Privacy Policy
                        </h1>

                        <p className="mb-6 text-lg leading-relaxed text-gray-800">
                            TuneFly respects your privacy. We are committed to protecting your personal information and ensuring a safe user experience.
                        </p>

                        <Section title="Information We Collect">
                            We collect minimal data required to provide app functionality, such as account details and music uploads.
                        </Section>

                        <Section title="How We Use Your Information">
                            Your information is only used to operate core features of the app. We do not sell or share your data with third parties.
                        </Section>

                        <Section title="How to Delete Your Account">
                            <ol className="list-decimal list-inside space-y-2 text-lg">
                                <li>Log into your account</li>
                                <li>Go to the Settings page</li>
                                <li>Click on <strong>"Delete my account permanently"</strong></li>
                                <li>Confirm the popup by selecting <strong>"Delete"</strong></li>
                            </ol>
                        </Section>

                        <Section title="Contact Us">
                            If you have questions, reach us at{" "}
                            <a href="mailto:support@tunefly.io" className="text-purple-600 font-semibold">
                                tuneflyadmin@gmail.com
                            </a>.
                        </Section>

                        <p className="text-sm text-gray-700 text-center mt-10">Last updated: September 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

type SectionProps = {
    title: string;
    children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
    return (
        <div className="mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
            <div className="text-gray-700">{children}</div>
        </div>
    );
}
