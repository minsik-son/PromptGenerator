import React from 'react';

interface GeneratedItem {
    title: string;
    prompt: string;
}

interface GeneratedResultProps {
    isGenerating: boolean;
    generatedPrompts: GeneratedItem[];
    copyToClipboard: (text: string, index: number) => void;
    copiedIndex: number | null;
}

const GeneratedResult: React.FC<GeneratedResultProps> = ({ isGenerating, generatedPrompts, copyToClipboard, copiedIndex }) => {
    return (
        <>
            {isGenerating ? (
                <div
                    className="max-w-3xl mx-auto mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 space-y-6"
                    data-oid="u1qzym."
                >
                    <div className="flex items-center justify-between mb-4" data-oid="x_5bkhc">
                        <h3 className="text-xl font-light" data-oid="pja3od6">
                            Generated Result
                        </h3>
                        <span className="text-sm text-gray-500" data-oid="m0rpj3v">
                            Processing...
                        </span>
                    </div>
                    <div className="space-y-4" data-oid="u:m.28q">
                        <div className="h-2 bg-gray-200 rounded animate-pulse" data-oid="oxykh.5"></div>
                        <div className="h-2 bg-gray-200 rounded animate-pulse" data-oid="cd-4.-g"></div>
                        <div className="h-2 bg-gray-200 rounded animate-pulse w-3/4" data-oid="z0u4l68"></div>
                    </div>
                </div>
            ) : (
                generatedPrompts.length > 0 && (
                    <div
                        className="max-w-3xl mx-auto bg-[#FFF9F1] rounded-2xl p-8 shadow-sm mb-12 border border-gray-100"
                        data-oid="results-container"
                    >
                        <div className="space-y-6">
                            {generatedPrompts.map((item, index) => (
                                <div key={index} className={index > 0 ? "pt-6 border-t border-gray-100" : ""}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-light">
                                            {item.title}
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(item.prompt, index)}
                                            className={`p-2 rounded-lg transition-all duration-200 ${
                                                copiedIndex === index 
                                                    ? 'bg-black text-white' 
                                                    : 'hover:bg-gray-100'
                                            }`}
                                            title="Copy to clipboard"
                                        >
                                            {copiedIndex === index ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-gray-700" dangerouslySetInnerHTML={{ 
                                        __html: item.prompt.replace(/\n/g, '<br>') 
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default GeneratedResult; 