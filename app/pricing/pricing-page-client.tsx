"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

const packages = [
  {
    title: "LaunchPad Package: Website & MVP Development",
    description: "Ideal for startups, entrepreneurs, and small businesses needing a professional launch or to validate a new concept.",
    features: [
      { name: "Project Duration", description: "2–4 weeks" },
      { name: "Deliverables", description: "A professional, high-performance website or a functional MVP (up to 3 core features)." },
      { name: "Tech Stack", description: "FastAPI / Next.js / Firebase / Vercel" },
      { name: "Deployment", description: "Fully deployed to a production environment." },
      { name: "Support", description: "30 days of complimentary post-launch bug fixes." },
      { name: "Communication", description: "Regular email or WhatsApp updates." },
    ],
    investment: "$800 – $1,500 (One-Time Project Fee)",
  },
  {
    title: "Growth Retainer: Continuous Development",
    description: "Ideal for businesses ready to iterate, scale, and optimize their product after the initial launch.",
    features: [
      { name: "Service", description: "Up to 10 dedicated development hours per month." },
      { name: "Monitoring", description: "Monthly performance reviews and proactive bug fixes." },
      { name: "Feature Planning", description: "Quarterly roadmap and strategy meeting." },
      { name: "Support", description: "Priority chat access and weekly progress updates." },
      { name: "Hosting & DevOps", description: "Fully managed hosting on Vercel or Google Cloud Run." },
    ],
    investment: "$1,500 (One-Time Setup) + $400 – $600 (Monthly Retainer)",
  },
  {
    title: "Partner Retainer: Embedded Technical Partner",
    description: "Ideal for established businesses seeking a dedicated, long-term technology partner to drive growth and innovation.",
    features: [
      { name: "Custom Roadmap", description: "A development plan tailored specifically to your business objectives." },
      { name: "Dedicated Support", description: "A reserved block of development hours with flexible feature requests." },
      { name: "Advanced Integration", description: "Expertise in AI, third-party APIs, automation, and advanced cloud architecture." },
      { name: "Strategy", description: "Bi-weekly or monthly strategic check-in calls." },
      { name: "Documentation", description: "Comprehensive codebase and system documentation." },
      { name: "Reporting", description: "Detailed weekly progress and performance reports." },
    ],
    investment: "$1,000 – $2,500 (Monthly Retainer)",
    note: "Optional revenue-share or equity partnerships can be discussed",
  },
]

const maintenancePlans = [
    {
        plan: "Lite",
        description: "Essential security patches and 24/7 uptime monitoring.",
        price: "$100",
    },
    {
        plan: "Standard",
        description: "Includes Lite + ongoing bug fixes and minor feature enhancements.",
        price: "$250",
    },
    {
        plan: "Premium",
        description: "Includes Standard + proactive feature development and AI model updates.",
        price: "$500 – $800",
    },
]

const serviceAddOns = [
    {
        service: "AI Chatbot Integration",
        price: "$300 – $700",
    },
    {
        service: "Custom User Interface Design & Development",
        price: "$200 – $1000",
    },
    {
        service: "Advanced API / Database Setup",
        price: "$200 – $500",
    },
    {
        service: "Custom Dashboard / Admin Panel",
        price: "$400 – $1,000",
    },
    {
        service: "Technical SEO Optimization",
        price: "$200 – $400",
    },
    {
        service: "GCP / AWS Cloud Deployment",
        price: "$300 – $600",
    },
]


export default function PricingPageClient() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Imagine Forge - Development Packages
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
          Choose a plan that fits your business goals—from launching your idea to scaling your platform.
        </p>
        <div className="mt-6">
            <div className="inline-block bg-yellow-700 border border-gray-700 rounded-full px-4 py-2">
                <p className="text-sm text-gray-300">
                Start with a <span className="font-bold text-white">7-Day Risk-Free Trial</span>
                </p>
            </div>
            <p className="mt-3 text-sm text-gray-400">
            We are confident in the value we provide. All our monthly retainer and maintenance plans begin with a 7-day risk-free trial period for you to experience our workflow and service.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.title} className="bg-gray-900/50 border-gray-800 text-white flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{pkg.title}</CardTitle>
              <CardDescription className="text-gray-400">{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {pkg.features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">{feature.name}:</span>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <div className="w-full">
                <p className="text-lg font-semibold text-center mb-2">{pkg.investment}</p>
                {pkg.note && <p className="text-xs text-gray-500 text-center">{pkg.note}</p>}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Card className="inline-block bg-gray-900/50 border-gray-800 text-white p-6">
            <CardHeader>
                <CardTitle>Custom Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-400">For complex projects, unique requirements, or needs not covered by our standard packages. <br/> Don't see a perfect fit? We can build a custom plan tailored specifically to your project's scope, technical requirements, and long-term goals. This can include dedicated teams, specialized integrations, or unique hosting solutions.</p>
            </CardContent>
            <CardFooter>
                <p className="w-full text-lg font-semibold">💰 Investment: Contact us for a custom quote.</p>
            </CardFooter>
        </Card>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">Standalone Maintenance & Support Plans</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="py-3 px-4 bg-gray-800/50 border-b border-gray-700 font-semibold text-white">Plan</th>
                        <th className="py-3 px-4 bg-gray-800/50 border-b border-gray-700 font-semibold text-white">Description</th>
                        <th className="py-3 px-4 bg-gray-800/50 border-b border-gray-700 font-semibold text-white">Price (per Month)</th>
                    </tr>
                </thead>
                <tbody>
                    {maintenancePlans.map(plan => (
                        <tr key={plan.plan} className="hover:bg-gray-800/50">
                            <td className="py-3 px-4 border-b border-gray-700">{plan.plan}</td>
                            <td className="py-3 px-4 border-b border-gray-700">{plan.description}</td>
                            <td className="py-3 px-4 border-b border-gray-700">{plan.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">Service Add-Ons</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="py-3 px-4 bg-gray-800/50 border-b border-gray-700 font-semibold text-white">Service</th>
                        <th className="py-3 px-4 bg-gray-800/50 border-b border-gray-700 font-semibold text-white">Price (One-Time)</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceAddOns.map(addOn => (
                        <tr key={addOn.service} className="hover:bg-gray-800/50">
                            <td className="py-3 px-4 border-b border-gray-700">{addOn.service}</td>
                            <td className="py-3 px-4 border-b border-gray-700">{addOn.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className="mt-20 text-center border-t border-gray-800 pt-10">
        <h2 className="text-3xl font-bold text-white">Payment Terms</h2>
        <div className="max-w-2xl mx-auto mt-4 text-gray-400 space-y-4">
            <p><span className="font-semibold text-white">Projects:</span> 50% deposit to begin work, 50% upon final delivery or milestone completion.</p>
            <p><span className="font-semibold text-white">Retainers:</span> Monthly plans are billed at the beginning of each 30-day cycle.</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-white">✉️ Ready to Build?</h2>
        <p className="mt-3 text-lg text-gray-400">Let’s build something powerful together.</p>
        <div className="mt-8 flex justify-center items-center gap-x-6">
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                <a href="mailto:syedhasnain769@gmail.com">
                    Email Us <ArrowRight className="ml-2 h-5 w-5" />
                </a>
            </Button>
        </div>
        <div className="mt-6 text-sm text-gray-500">
            <p>Website: Imagineforge.tech | Phone: ‪+1 (284) 342‑6631‬</p>
        </div>
      </div>
    </div>
  )
}
