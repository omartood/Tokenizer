# Changelog

All notable changes to Token Visualizer will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-26

### 🎉 Initial Release

#### Added
- Real-time tokenization visualization
- Support for 6 different encoding models:
  - cl100k_base (GPT-4, GPT-3.5-turbo, GPT-4o)
  - o200k_base (GPT-4o newer encoding)
  - p50k_base (GPT-3 Davinci, Curie)
  - p50k_edit (GPT-3 Edit models)
  - r50k_base (Codex models)
  - gpt2 (GPT-2 models)
- Beautiful dark mode UI with gradient backgrounds
- Glassmorphism effects and animated blobs
- Color-coded token visualization
- Statistics dashboard showing:
  - Character count
  - Word count
  - Token count
  - Estimated API cost
- Interactive features:
  - Copy text to clipboard
  - Copy token IDs to clipboard
  - Export tokenization data as JSON
  - Clear all functionality
- Toggle buttons for:
  - Show/hide token IDs
  - Show/hide statistics
- Hover effects on tokens with scale animation
- Responsive design for mobile and desktop
- Real-time updates as you type

#### Technical
- Built with Next.js 16.0
- TypeScript for type safety
- Tailwind CSS for styling
- js-tiktoken for tokenization
- Client-side tokenization (no API calls needed)

#### Documentation
- Comprehensive README with features and usage
- Contributing guidelines
- Screenshot guide
- MIT License
- Changelog

### 🎨 Design Features
- Purple/pink/blue gradient background
- Animated floating blobs
- Frosted glass card effects
- Smooth transitions and animations
- 8 different token colors
- Professional typography

### 🚀 Performance
- Instant tokenization (client-side)
- No API rate limits
- No backend required
- Fast page loads with Next.js

---

## Future Roadmap

### Planned Features
- [ ] Comparison mode (side-by-side model comparison)
- [ ] History of recent tokenizations
- [ ] File upload support
- [ ] Batch processing
- [ ] Custom pricing configuration
- [ ] Token limit warnings
- [ ] Keyboard shortcuts
- [ ] Light mode theme
- [ ] Multi-language support
- [ ] Save/load functionality
- [ ] Share tokenization via URL
- [ ] API endpoint for programmatic access

### Under Consideration
- User accounts
- Analytics dashboard
- Browser extension
- VS Code extension
- CLI tool
- Docker support

---

## Version History

- **v1.0.0** (2025-10-26) - Initial release

---

[1.0.0]: https://github.com/yourusername/tokention/releases/tag/v1.0.0
