#!/usr/bin/env node

const fs = require('fs');
const axios = require('axios');

(async () => {
  const { data: config } = await axios.get('https://kou-pg.com/api/config');
  const { description, email, socials, skillGroups, portfolios } = config;
  const lines = [];

  /*
   * Overview
   */
  lines.push('# Overview');
  lines.push('');
  lines.push(description);

  /*
   * Contact
   */
  lines.push('# Contact');
  lines.push('');
  lines.push(`[${email}](mailto:${email})`);

  /*
   * Social
   */
  lines.push('# Social');
  lines.push('');
  for (const social of socials) {
    lines.push(
      `<a href="${social.href}"><img src="https://kou-pg.com${social.imgSrc}" alt="${social.name}" width="40" height="40"/></a>`
    );
  }

  /*
   * Skill
   */
  lines.push('# Skill');
  lines.push('');
  for (const skillGroup of skillGroups) {
    lines.push(`## ${skillGroup.name}`);
    lines.push('');
    for (const skill of skillGroup.skills) {
      lines.push(
        `<a href="${skill.href}"><img src="https://kou-pg.com${skill.imgSrc}" alt="${skill.name}" width="40" height="40"/></a>`
      );
    }
  }

  /*
   * Portfolio
   */
  lines.push('# Portfolio');
  lines.push('');
  for (const portfolio of portfolios) {
    lines.push(portfolio.url ? `## [${portfolio.title}](${portfolio.url})` : `## ${portfolio.title}`);
    lines.push('');
    lines.push(portfolio.description);
    lines.push('');
    lines.push(`[View on GitHub](${portfolio.githubUrl})`);
  }

  // Update README
  fs.writeFileSync('README.md', lines.join('\n'));
})();
