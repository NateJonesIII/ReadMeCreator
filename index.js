const inquirer = require("inquirer");
const fs = require("fs");

inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the project title? "
    },
    {
        type: "input",
        name: "description",
        message: "What is the project description? "
    },
    {
        type: "input",
        name: "install",
        message: "What are the installation instructions? "
    },
    {
        type: "input",
        name: "usage",
        message: "How do you use the project? "
    },
    {
        type: "input",
        name: "contribution",
        message: "What are the contributions? "
    },
    {
        type: "input",
        name: "test",
        message: "Please enter the project test instructions "
    },
    {
        type: "list",
        name: "license",
        message: "Select a license",
        choices: ["none", "apache", "openbsd", "perl", "boost"]
    },
    {
        type: "input",
        name: "gitName",
        message: "Please enter your github account name: "
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email: "
    }
]).then(result => {
    console.log(`Title:${result.title} \n Description:${result.description} \n Installtion:${result.install} Usage:${result.usage} \n Contributions:${result.contribution} \n Tests:${result.test} \n License:${result.license} \n`);

    //License text for assigned choices
    const none = "N/A";
    const apacheLicense = `Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.`;

    const openBsdLicense = `Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    
    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    
    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
    IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, 
    OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`;

    const perlLicense = `For those of you that choose to use the GNU General Public License, my interpretation of the GNU General Public License is that no Perl script falls under the terms of the GPL unless you explicitly put said script under the terms of the GPL yourself.

    Furthermore, any object code linked with perl does not automatically fall under the terms of the GPL, provided such object code only adds definitions of subroutines and variables, and does not otherwise impair the resulting interpreter from executing any standard Perl script. 
    I consider linking in C subroutines in this manner to be the moral equivalent of defining subroutines in the Perl language itself. You may sell such an object file as proprietary provided that you provide or offer to provide the Perl source, as specified by the GNU General Public License. (This is merely an alternate way of specifying input to the program.) You may also sell a binary produced by the dumping of a running Perl script that belongs to you, provided that you provide or offer to provide the Perl source as specified by the GPL. 
    (The fact that a Perl interpreter and your code are in the same binary file is, in this case, a form of mere aggregation.)`;

    const boostLicense = `Permission is hereby granted, free of charge, to any person or organization
    obtaining a copy of the software and accompanying documentation covered by
    this license (the "Software") to use, reproduce, display, distribute,
    execute, and transmit the Software, and to prepare derivative works of the
    Software, and to permit third-parties to whom the Software is furnished to
    do so, all subject to the following:
    
    The copyright notices in the Software and this entire statement, including
    the above license grant, this restriction and the following disclaimer,
    must be included in all copies of the Software, in whole or in part, and
    all derivative works of the Software, unless such copies or derivative
    works are solely in the form of machine-executable object code generated by
    a source language processor.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
    SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
    FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
    ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.` ;

    //Badge URL's for license 
    const apacheBadge = `[![License](https://www.apache.org/foundation/press/kit/img/20th-anniversary-badge/APACHE-20th-badge-2-cmyk.svg)](https://opensource.org/licenses/Apache-2.0)`;
    const openBsdBadge = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)] (https://opensource.org/licenses/BSD-3-Clause)`;
    const perlBadge = `[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)] (https://opensource.org/licenses/Artistic-2.0)`;
    const boostBadge = `[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;

    var badgeContainer = "";
    var licenseContainer = "";

    //"none","apache", "openbsd", "perl", "boost"
    if (result.license === "apache") {
        badgeContainer = apacheBadge;
        licenseContainer = apacheLicense;
    } else if (result.license === "openbsd") {
        badgeContainer = openBsdBadge;
        licenseContainer = openBsdLicense;
    } else if (result.license === "perl") {
        badgeContainer = perlBadge;
        licenseContainer = perlLicense;
    } else if (result.license === "boost") {
        badgeContainer = boostBadge;
        licenseContainer = boostLicense;
    } else {
        licenseContainer = "N/A";
    }

    // Output template for readMe file
    const readme = `
    ${badgeContainer}
    # ${result.title}                   

    ## Description
    ${result.description}

    ## Table of contents 
    [Installation](#installation)

    [Usage](#usage)

    [Contributing](#contributing)

    [Tests](#tests)

    [License](#license)
    
    [Questions](#questions)

    ## Installation
    - ${result.install}
    
    ## Usage
    - ${result.usage}
   
    ## Contributing
    - ${result.contribution}

    ## Tests
    - ${result.test}

    ## License
    - ${licenseContainer}

    ## Questions

    Link to my github: https://github.com/${result.gitName}
    For further questions please email me at ${result.email}
    `;

    //Saving file to external README.md
    fs.writeFile("README.md", readme, (err) => {
        err ? console.log(err) : console.log("File saved successful");
    });
});